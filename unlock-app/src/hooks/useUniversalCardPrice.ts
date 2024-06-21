import { useQuery } from '@tanstack/react-query'
import { locksmith } from '~/config/storage'

interface Options {
  network: number
  lockAddress: string
  purchaseData: string[]
  recipients: string[]
  enabled?: boolean
}

export const useUniversalCardPrice = ({
  network,
  lockAddress,
  recipients,
  purchaseData,
  enabled = true,
}: Options) => {
  return useQuery(
    ['useUniversalCardPrice', network, lockAddress, purchaseData, recipients],
    async () => {
      const response = await locksmith.getUniversalCardPrice(
        network,
        lockAddress,
        purchaseData,
        recipients
      )
      return response.data
    },
    {
      enabled,
    }
  )
}
