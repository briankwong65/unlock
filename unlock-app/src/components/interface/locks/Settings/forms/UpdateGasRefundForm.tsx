import { useForm } from 'react-hook-form'
import { Button, Input } from '@unlock-protocol/ui'
import { useAuth } from '~/contexts/AuthenticationContext'
import { useCallback, useEffect } from 'react'
import useGetGasRefund from '~/hooks/useGetGasRefund'

interface Props {
  lockAddress: string
  network: number
  disabled?: boolean
  onChanged: () => void
}

interface FormValues {
  amount: string
}

export function UpdateGasRefundForm({
  lockAddress,
  network,
  disabled,
  onChanged,
}: Props) {
  const { getWalletService } = useAuth()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      amount: '0',
    },
  })

  const {
    data: gasRefundValue,
    isInitialLoading: isLoading,
    refetch: refetchGasRefundValue,
  } = useGetGasRefund(lockAddress, network)

  useEffect(() => {
    if (!isLoading && gasRefundValue) {
      setValue('amount', gasRefundValue)
    }
  }, [gasRefundValue, isLoading, setValue])

  const onSetGasRefund = useCallback(
    async ({ amount }: FormValues) => {
      const walletService = await getWalletService(network)
      await walletService.setGasRefund({
        lockAddress,
        gasRefundValue: amount.toString(),
      })
      await refetchGasRefundValue()
      await onChanged()
    },
    [getWalletService, lockAddress, network, refetchGasRefundValue]
  )

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSetGasRefund)}>
      <Input
        disabled={disabled || isSubmitting}
        label="Gas Refund:"
        {...register('amount', {
          valueAsNumber: true,
        })}
        type="number"
        placeholder="0.00"
        step="any"
        min={0}
        error={errors.amount?.message}
        description="The amount of tokens to refund when someone sends a renewal transaction for users. This is paid using the currency of the lock."
      />
      <Button disabled={disabled} loading={isSubmitting} type="submit">
        Set gas refund
      </Button>
    </form>
  )
}
