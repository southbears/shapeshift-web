import type { WalletConnectEthSendTransactionCallRequest } from '@shapeshiftoss/hdwallet-walletconnect-bridge/dist/types'
import { CurrencyAmount } from '@uniswap/sdk'
import type { FC } from 'react'
import { RawText } from 'components/Text'

import { useCallRequestFees } from './useCallRequestFees'

type Props = {
  request: WalletConnectEthSendTransactionCallRequest['params'][number]
}

export const GasFeeEstimateLabel: FC<Props> = ({ request }) => {
  const fees = useCallRequestFees(request)
  if (!fees) return null
  return (
    <RawText color='gray.500' fontWeight='medium'>
      {CurrencyAmount.ether(fees.slow.txFee).toFixed()} ETH
    </RawText>
  )
}
