import { ethers } from 'ethers'
import request from 'supertest'
import { loginRandomUser } from '../../test-helpers/utils'
import app from '../../app'
import { vi } from 'vitest'
import { getEventFixture } from '../../fixtures/events'
import { CheckoutConfig, EventData } from '../../../src/models'
import { saveEvent } from '../../../src/operations/eventOperations'
import { Verifier } from '../../../src/models/verifier'

const lockAddress = '0x3F09aD349a693bB62a162ff2ff3e097bD1cE9a8C'
const network = 10
const owner = `0x00192fb10df37c9fb26829eb2cc623cd1bf599e8`

vi.mock('@unlock-protocol/unlock-js', () => {
  return {
    Web3Service: vi.fn().mockImplementation(() => {
      return {
        isLockManager: (lock: string) => lockAddress === lock,
      }
    }),
  }
})

describe('Verifier v2 endpoints for locksmith', () => {
  // describe('Verifiers for locks', () => {
  //   it('Get list items without authorization', async () => {
  //     expect.assertions(1)
  //     const lock = await ethers.Wallet.createRandom().getAddress()
  //     const getListEndpoint = await request(app).get(
  //       `/v2/api/verifier/${network}/${lock}`
  //     )
  //     expect(getListEndpoint.status).toBe(401)
  //   })

  //   it('Get list items from lock with random address (not lockManager)', async () => {
  //     expect.assertions(2)
  //     const lock = await ethers.Wallet.createRandom().getAddress()
  //     const { loginResponse } = await loginRandomUser(app)
  //     expect(loginResponse.status).toBe(200)

  //     const getListResponse = await request(app)
  //       .get(`/v2/api/verifier/list/${network}/${lock}`)
  //       .set('authorization', `Bearer ${loginResponse.body.accessToken}`)

  //     expect(getListResponse.status).toBe(403)
  //   })

  //   it('Add verifier and delete correctly', async () => {
  //     expect.assertions(3)

  //     const { loginResponse } = await loginRandomUser(app)
  //     const randomWallet = await ethers.Wallet.createRandom().getAddress()
  //     expect(loginResponse.status).toBe(200)

  //     const addVerifierResponse = await request(app)
  //       .put(`/v2/api/verifier/${network}/${lockAddress}/${randomWallet}`)
  //       .set('authorization', `Bearer ${loginResponse.body.accessToken}`)

  //     expect(addVerifierResponse.status).toBe(201)

  //     const deleteVerifierResponse = await request(app)
  //       .delete(`/v2/api/verifier/${network}/${lockAddress}/${randomWallet}`)
  //       .set('authorization', `Bearer ${loginResponse.body.accessToken}`)

  //     expect(deleteVerifierResponse.status).toBe(200)
  //   })

  //   it('Add verifier with name and delete correctly', async () => {
  //     expect.assertions(4)
  //     const verifierName = 'randomUser'

  //     const { loginResponse } = await loginRandomUser(app)
  //     const randomWallet = await ethers.Wallet.createRandom().getAddress()
  //     expect(loginResponse.status).toBe(200)

  //     const addVerifierResponse = await request(app)
  //       .put(`/v2/api/verifier/${network}/${lockAddress}/${randomWallet}`)
  //       .set('authorization', `Bearer ${loginResponse.body.accessToken}`)
  //       .send({ verifierName: verifierName })

  //     expect(addVerifierResponse.status).toBe(201)
  //     expect(addVerifierResponse.body.name).toBe(verifierName)

  //     const deleteVerifierResponse = await request(app)
  //       .delete(`/v2/api/verifier/${network}/${lockAddress}/${randomWallet}`)
  //       .set('authorization', `Bearer ${loginResponse.body.accessToken}`)

  //     expect(deleteVerifierResponse.status).toBe(200)
  //   })

  //   it('Get verifiers list', async () => {
  //     expect.assertions(3)

  //     const { loginResponse } = await loginRandomUser(app)

  //     expect(loginResponse.status).toBe(200)

  //     const getVerifierListResponse = await request(app)
  //       .get(`/v2/api/verifier/list/${network}/${lockAddress}`)
  //       .set('authorization', `Bearer ${loginResponse.body.accessToken}`)

  //     expect(getVerifierListResponse.status).toBe(200)
  //     expect(Array.isArray(getVerifierListResponse.body.results)).toStrictEqual(
  //       true
  //     )
  //   })
  // })

  describe('Verifiers for events', () => {
    beforeAll(async () => {
      await EventData.truncate()
      await CheckoutConfig.truncate()
      await Verifier.truncate()
    })

    it('Get verifiers for an event', async () => {
      expect.assertions(2)
      // create an event
      const eventParams = getEventFixture({
        checkoutConfig: {
          config: {
            locks: {
              [lockAddress]: {
                network,
              },
            },
          },
        },
      })
      const [event] = await saveEvent(eventParams, owner)
      const slug = event.data.slug
      const getListEndpoint = await request(app).get(
        `/v2/events/${slug}/verifiers`
      )
      expect(getListEndpoint.status).toBe(200)
      expect(getListEndpoint.body.results).toBe([])
    })

    it('Add verifier and lists correctly', async () => {
      expect.assertions(3)

      const { loginResponse } = await loginRandomUser(app)
      // create an event
      const eventParams = getEventFixture({
        checkoutConfig: {
          config: {
            locks: {
              [lockAddress]: {
                network,
              },
            },
          },
        },
      })
      const [event] = await saveEvent(
        eventParams,
        loginResponse.body.walletAddress
      )
      const slug = event.data.slug
      const verifierAddress = await ethers.Wallet.createRandom().getAddress()

      const addVerifierResponse = await request(app)
        .put(`/v2/events/${slug}/verifiers/${verifierAddress}`)
        .set('authorization', `Bearer ${loginResponse.body.accessToken}`)

      expect(addVerifierResponse.status).toBe(201)
      expect(addVerifierResponse.body.results).toBe([verifierAddress])
    })

    // it('Add verifier with name and delete correctly', async () => {
    //   expect.assertions(4)
    //   const verifierName = 'randomUser'

    //   const { loginResponse } = await loginRandomUser(app)
    //   const randomWallet = await ethers.Wallet.createRandom().getAddress()
    //   expect(loginResponse.status).toBe(200)

    //   const addVerifierResponse = await request(app)
    //     .put(`/v2/api/verifier/${network}/${lockAddress}/${randomWallet}`)
    //     .set('authorization', `Bearer ${loginResponse.body.accessToken}`)
    //     .send({ verifierName: verifierName })

    //   expect(addVerifierResponse.status).toBe(201)
    //   expect(addVerifierResponse.body.name).toBe(verifierName)

    //   const deleteVerifierResponse = await request(app)
    //     .delete(`/v2/api/verifier/${network}/${lockAddress}/${randomWallet}`)
    //     .set('authorization', `Bearer ${loginResponse.body.accessToken}`)

    //   expect(deleteVerifierResponse.status).toBe(200)
    // })

    // it('Get verifiers list', async () => {
    //   expect.assertions(3)

    //   const { loginResponse } = await loginRandomUser(app)

    //   expect(loginResponse.status).toBe(200)

    //   const getVerifierListResponse = await request(app)
    //     .get(`/v2/api/verifier/list/${network}/${lockAddress}`)
    //     .set('authorization', `Bearer ${loginResponse.body.accessToken}`)

    //   expect(getVerifierListResponse.status).toBe(200)
    //   expect(Array.isArray(getVerifierListResponse.body.results)).toStrictEqual(
    //     true
    //   )
    // })
  })
})
