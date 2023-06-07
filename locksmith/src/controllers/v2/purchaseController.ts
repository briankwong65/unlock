import { RequestHandler } from 'express'
import { randomUUID } from 'node:crypto'

import {
  getStripeConnectForLock,
  getStripeCustomerIdForAddress,
  createStripeCustomer,
} from '../../operations/stripeOperations'
import PaymentProcessor from '../../payment/paymentProcessor'
import * as Normalizer from '../../utils/normalizer'
import logger from '../../logger'
import { z } from 'zod'
import { isSoldOut } from '../../operations/lockOperations'
import Dispatcher from '../../fulfillment/dispatcher'
import Stripe from 'stripe'
import stripe from '../../config/stripe'
import { ethers } from 'ethers'
import { recoverTransferAuthorization } from '@unlock-protocol/unlock-js'
import { networks } from '@unlock-protocol/networks'
import { UniversalCardPurchase } from '../../models/UniversalCardPurchase'

const createPaymentIntentBody = z.object({
  recipients: z
    .array(z.string())
    .min(1)
    .transform((item) => item.map((item) => Normalizer.ethereumAddress(item))),
  stripeTokenId: z.string(),
  pricing: z.number(),
  recurring: z.number().optional(),
  referrers: z
    .array(z.union([z.string(), z.null()]))
    .nullish()
    .default([]),
  data: z
    .array(z.union([z.string(), z.null()]))
    .nullish()
    .default([]),
})

const Processor = new PaymentProcessor()

export const createSetupIntent: RequestHandler = async (request, response) => {
  try {
    const userAddress = Normalizer.ethereumAddress(request.user!.walletAddress)
    let stripeCustomerId = await getStripeCustomerIdForAddress(userAddress)
    if (!stripeCustomerId) {
      stripeCustomerId = await createStripeCustomer(undefined, userAddress)
    }

    const setupIntent = await Processor.createSetupIntent({
      customerId: stripeCustomerId,
    })

    return response.status(201).send(setupIntent)
  } catch (error) {
    logger.error(error.message)
    return response.status(500).send({
      error: 'Unable to create setupIntent',
    })
  }
}

export const list: RequestHandler = async (request, response) => {
  try {
    const userAddress = Normalizer.ethereumAddress(request.user!.walletAddress)
    let customerId = await getStripeCustomerIdForAddress(userAddress)

    if (!customerId) {
      customerId = await createStripeCustomer(undefined, userAddress)
    }
    const methods = await Processor.listCardMethods({
      customerId,
    })

    return response.status(200).send({
      methods,
    })
  } catch (error) {
    logger.error(error.message)
    return response.status(500).send({
      message: 'Unable to find methods associated with the account',
    })
  }
}

export const createPaymentIntent: RequestHandler = async (
  request,
  response
) => {
  const lockAddress = Normalizer.ethereumAddress(request.params.lockAddress)
  const network = Number(request.params.network)
  const userAddress = Normalizer.ethereumAddress(request.user!.walletAddress)
  const { recipients, recurring, stripeTokenId, pricing, data, referrers } =
    await createPaymentIntentBody.parseAsync(request.body)

  const soldOut = await isSoldOut(lockAddress, network, recipients.length)
  if (soldOut) {
    throw new Error('Lock is sold out.')
  }

  const { stripeEnabled, stripeAccount: stripeConnectApiKey = '' } =
    await getStripeConnectForLock(lockAddress, network)

  if (!stripeEnabled) {
    return response
      .status(400)
      .send({ message: 'Missing Stripe Connect integration' })
  }

  let stripeCustomerId = await getStripeCustomerIdForAddress(userAddress)

  if (!stripeCustomerId && stripeTokenId) {
    // Create a "global" stripe customer id
    // (we will create local customer when we issue charges for a connected lock)
    stripeCustomerId = await createStripeCustomer(
      stripeTokenId,
      Normalizer.ethereumAddress(userAddress)
    )
  }

  if (!stripeCustomerId) {
    return response
      .status(400)
      .send({ message: 'Missing Stripe customer info' })
  }

  const dispatcher = new Dispatcher()
  const hasEnoughToPayForGas = await dispatcher.hasFundsForTransaction(network)

  if (!hasEnoughToPayForGas) {
    return response.status(400).send({
      error: `Purchaser does not have enough to pay for gas on ${network}`,
    })
  }
  const processor = new PaymentProcessor()
  const paymentIntentDetails = await processor.createPaymentIntent(
    userAddress,
    recipients,
    stripeCustomerId,
    lockAddress,
    pricing,
    network,
    stripeConnectApiKey,
    recurring,
    data,
    referrers
  )
  return response.send(paymentIntentDetails)
}

const PaymentCaptureBody = z.object({
  lock: z.string().transform((item) => Normalizer.ethereumAddress(item)),
  network: z.number(),
  userAddress: z.string().transform((item) => Normalizer.ethereumAddress(item)),
  recipients: z.array(
    z.string().transform((item) => Normalizer.ethereumAddress(item))
  ),
  referrers: z
    .array(z.union([z.string(), z.null()]))
    .nullish()
    .default([]),
  data: z
    .array(z.union([z.string(), z.null()]))
    .nullish()
    .default([]),
  paymentIntent: z.string(),
})

export const captureExtension: RequestHandler = async (request, response) => {
  const {
    network,
    recipients,
    paymentIntent: paymentIntentId,
    data,
    referrers,
    lock: lockAddress,
    userAddress,
  } = await PaymentCaptureBody.parseAsync(request.body)

  const dispatcher = new Dispatcher()
  const hasEnoughToPayForGas = await dispatcher.hasFundsForTransaction(network)
  if (!hasEnoughToPayForGas) {
    return response.status(400).send({
      error: `Purchaser does not have enough to pay for gas on ${network}`,
    })
  }

  const soldOut = await isSoldOut(lockAddress, network, recipients.length)

  if (soldOut) {
    // TODO: Cancel authorization
    return response.status(400).send({
      error: 'Lock is sold out.',
    })
  }

  try {
    const processor = new PaymentProcessor()
    const { charge, paymentIntent, paymentIntentRecord } =
      await processor.getPaymentIntentRecordAndCharge({
        userAddress,
        lockAddress,
        network,
        paymentIntentId,
        recipients,
        referrers: referrers || [],
        data: data || [],
      })

    const fulfillmentDispatcher = new Dispatcher()

    const transactionHandler = async (_: any, transactionHash: string) => {
      // Update our charge object
      charge.transactionHash = transactionHash
      await charge.save()

      // Update Stripe's payment Intent
      await stripe.paymentIntents.update(
        paymentIntentId,
        {
          metadata: {
            transactionHash,
          },
        },
        {
          stripeAccount: paymentIntentRecord.connectedStripeId,
        }
      )

      // We only charge the card when everything else was successful
      await stripe.paymentIntents.capture(paymentIntentId, {
        stripeAccount: paymentIntentRecord.connectedStripeId,
      })
      // Send the transaction hash without waiting.
      response.status(201).send({
        transactionHash,
      })
    }
    // Note: we will not wait for the tx to be fully executed as it may trigger an HTTP timeout!
    // This should be fine though since grantKeys transaction should succeed anyway
    const items: Record<'id' | 'owner', string>[] | null =
      await fulfillmentDispatcher.grantKeys(
        paymentIntent.metadata.lock,
        paymentIntent.metadata.recipient.split(',').map((recipient) => ({
          recipient,
        })),
        parseInt(paymentIntent.metadata.network, 10),
        transactionHandler
      )

    /**
     * For now, we are only allowing subscription for the user who purchased the key, not for the multiple recipients
     * because we don't have a way for them to "accept" the subscription and we don't want owner to be charged for all of them
     * without a way to manage these from the dashboard.
     */
    const key = items?.find((item) => item.owner === userAddress)

    if (!key) {
      return
    }

    const split = recipients?.length || 1
    const subscription = new KeySubscription()
    subscription.connectedCustomer = paymentIntentRecord.connectedCustomerId
    subscription.stripeCustomerId = paymentIntentRecord.stripeCustomerId
    subscription.keyId = Number(key.id)
    subscription.amount = paymentIntent.amount / split
    subscription.unlockServiceFee = paymentIntent.application_fee_amount
      ? paymentIntent.application_fee_amount / split
      : 0
    subscription.lockAddress = lockAddress
    subscription.userAddress = userAddress
    subscription.network = network
    subscription.recurring = Number(paymentIntent.metadata.recurring || 0)
    await subscription.save()

    logger.info(
      `Subscription ${subscription.id} created for ${subscription.userAddress} on ${subscription.network} and for lock ${subscription.lockAddress}. It will renew key ${subscription.keyId} for ${subscription.recurring}`
    )

    return
  } catch (error) {
    if (response.headersSent) {
      return
    }
    logger.error('There was an error when capturing payment', error)
    return response.status(400).send({ error: error.message })
  }
}

export const removePaymentMethods: RequestHandler = async (
  request,
  response
) => {
  const userAddress = Normalizer.ethereumAddress(request.user!.walletAddress)
  const customerId = await getStripeCustomerIdForAddress(userAddress)

  if (!customerId) {
    return response
      .status(400)
      .send({ message: 'Missing Stripe customer info' })
  }

  const processor = new PaymentProcessor()
  await processor.removePaymentMethods({
    customerId,
  })
  return response.status(200).send({ success: true })
}

const createOnRampSessionBody = z.object({
  purchaseData: z.array(z.string()),
  recipients: z.array(z.string()),
  transferSignature: z.string(),
  transferMessage: z.object({
    from: z.string(),
    nonce: z.string(),
    to: z.string(),
    validAfter: z.number(),
    validBefore: z.number(),
    value: z.string(),
  }),
  purchaseSignature: z.string(),
  purchaseMessage: z.object({
    lock: z.string(),
    sender: z.string(),
    expiration: z.number(),
  }),
})

/**
 * Create session for universal credit card support.
 * TODO: use swap and purchase?
 * @param request
 * @param response
 * @returns
 */
export const createOnRampSession: RequestHandler = async (
  request,
  response
) => {
  const lockAddress = Normalizer.ethereumAddress(request.params.lockAddress)
  const network = Number(request.params.network)
  const userAddress = Normalizer.ethereumAddress(request.user!.walletAddress)
  const { transferSignature, transferMessage } =
    await createOnRampSessionBody.parseAsync(request.body)

  let usdcContractAddress
  const networkConfig = networks[network]
  if (networkConfig?.tokens) {
    usdcContractAddress = networkConfig.tokens.find(
      (token: any) => token.symbol === 'USDC'
    )?.address
  }

  if (!usdcContractAddress) {
    throw new Error('USDC not available for this network')
  }

  const universalCardConfig = networks[network]?.universalCard
  if (!universalCardConfig) {
    throw new Error('Universal card payments not supported on this network')
  }

  const providerUrl = networks[network].provider
  const provider = new ethers.providers.JsonRpcBatchProvider(providerUrl)

  const recovered = await recoverTransferAuthorization(
    usdcContractAddress,
    transferMessage,
    network,
    transferSignature,
    provider
  )

  if (recovered.toLowerCase() !== userAddress.toLowerCase()) {
    return response.status(400).send({ message: 'Signatures do not match' })
  }

  const OnrampSessionResource = Stripe.StripeResource.extend({
    create: Stripe.StripeResource.method({
      method: 'POST',
      path: 'crypto/onramp_sessions',
    }),
  })

  // Value is in 6 decimals (USDC)
  const amount = ethers.utils.formatUnits(
    ethers.BigNumber.from(transferMessage.value),
    6
  )

  const session = await new OnrampSessionResource(stripe).create({
    transaction_details: {
      lock_wallet_address: true, // Making sure the user does not change the wallet!
      source_currency: 'usd',
      destination_currency: universalCardConfig.stripeDestinationCurrency,
      destination_exchange_amount: amount,
      destination_network: universalCardConfig.stripeDestinationNetwork,
      supported_destination_currencies: [
        universalCardConfig.stripeDestinationCurrency,
      ],
      supported_destination_networks: [
        universalCardConfig.stripeDestinationNetwork,
      ],
      wallet_addresses: {
        [universalCardConfig.stripeDestinationNetwork]: userAddress,
      },
    },
  })

  // save everything so we can use if needed!
  await UniversalCardPurchase.create({
    id: randomUUID(),
    lockAddress,
    network,
    userAddress,
    // @ts-expect-error Property 'id' does not exist on type 'Response<object>'.ts(2339)
    stripeSession: session.id,
    body: request.body,
  })

  return response.status(200).send(session)
}

/**
 * Execute the purchase transaction!
 * with all the signature and stuff!
 * @param request
 * @param response
 * @returns
 */
export const captureOnRamp: RequestHandler = async (request, response) => {
  const purchase = await UniversalCardPurchase.findOne({
    where: {
      stripeSession: request.params.session,
    },
  })

  if (!purchase) {
    return response.status(404).send({
      message: 'Session does not exist',
    })
  }

  // No need to check the status of the session because the tx would fail if the user cannot actually pay!
  const dispatcher = new Dispatcher()
  const transaction = await dispatcher.buyWithCardPurchaser(
    purchase.network,
    purchase.lockAddress,
    purchase.body.recipients,
    {
      message: purchase.body.transferMessage,
      signature: purchase.body.transferSignature,
    },
    {
      message: purchase.body.purchaseMessage,
      signature: purchase.body.purchaseSignature,
    },
    purchase.body.purchaseData
  )

  // TODO : save transaction hash in the DB so we know we have successfuly executed that transaction!

  return response.send(transaction)
}
