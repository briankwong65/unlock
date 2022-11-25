import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Input } from '@unlock-protocol/ui'
import { ethers } from 'ethers'
import { useForm } from 'react-hook-form'
import { ToastHelper } from '~/components/helpers/toast.helper'
import { useWalletService } from '~/utils/withWalletService'
import { useWeb3Service } from '~/utils/withWeb3Service'

interface UpdateReferralFeeProps {
  lockAddress: string
  network: number
  isManager: boolean
  disabled: boolean
}

interface FormProps {
  referralFeePercentage: number
}

const ZERO = ethers.constants.AddressZero

export const UpdateReferralFee = ({
  lockAddress,
  network,
  isManager,
  disabled,
}: UpdateReferralFeeProps) => {
  const walletService = useWalletService()
  const web3Service = useWeb3Service()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormProps>()

  const setReferrerFee = async (fields: FormProps) => {
    await walletService.setReferrerFee({
      lockAddress,
      address: ZERO,
      feeBasisPoint: fields?.referralFeePercentage * 100,
    })
  }

  const getReferrerFees = async () => {
    return await web3Service.referrerFees({
      lockAddress,
      network,
      address: ZERO,
    })
  }

  const setReferrerFeeMutation = useMutation(setReferrerFee)

  const onSubmit = async (fields: FormProps) => {
    const setReferrerFeePromise = setReferrerFeeMutation.mutateAsync(fields)

    await ToastHelper.promise(setReferrerFeePromise, {
      loading: 'Updating referrer fee',
      error: 'Failed to update the values, please try again.',
      success: 'Referrer fee updated.',
    })
  }

  const { isLoading } = useQuery(
    ['getReferrerFees', lockAddress, network, setReferrerFeeMutation.isSuccess],
    async () => getReferrerFees(),
    {
      onSuccess: (value: number) => {
        setValue('referralFeePercentage', value / 100)
      },
    }
  )

  const disabledInput =
    disabled || setReferrerFeeMutation.isLoading || isLoading

  return (
    <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Referrer fee %"
        type="numeric"
        {...register('referralFeePercentage', {
          min: 0,
          max: 100,
        })}
        error={
          errors?.referralFeePercentage &&
          'This field accept percentage value between 0 and 100.'
        }
        disabled={disabledInput}
      />
      {isManager && (
        <Button
          className="w-full md:w-1/3"
          type="submit"
          disabled={disabledInput}
          loading={setReferrerFeeMutation.isLoading}
        >
          Apply
        </Button>
      )}
    </form>
  )
}
