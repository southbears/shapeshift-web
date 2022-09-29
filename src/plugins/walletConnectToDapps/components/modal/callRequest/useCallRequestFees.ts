import type { EvmBaseAdapter, EvmChainId, FeeDataEstimate } from '@shapeshiftoss/chain-adapters'
import { FeeDataKey } from '@shapeshiftoss/chain-adapters'
import type { WalletConnectEthSendTransactionCallRequest } from '@shapeshiftoss/hdwallet-walletconnect-bridge/dist/types'
import { useWalletConnect } from 'plugins/walletConnectToDapps/WalletConnectBridgeContext'
import { useCallback, useEffect, useState } from 'react'
import { getChainAdapterManager } from 'context/PluginProvider/chainAdapterSingleton'

export function useCallRequestFees(
  request: WalletConnectEthSendTransactionCallRequest['params'][number],
) {
  const [fees, setFees] = useState<FeeDataEstimate<EvmChainId> | undefined>({
    [FeeDataKey.Slow]: { txFee: '218975', chainSpecific: null as any },
    [FeeDataKey.Average]: { txFee: '218975', chainSpecific: null as any },
    [FeeDataKey.Fast]: { txFee: '218975', chainSpecific: null as any },
  })

  const walletConnect = useWalletConnect()
  const address = walletConnect.bridge?.connector.accounts[0]
  const connectedChainId = walletConnect.bridge?.connector.chainId
  const fetchFees = useCallback(async () => {
    if (!address) return undefined

    const chainId = `eip155:${request.chainId ?? connectedChainId}`
    const adapter = getChainAdapterManager().get(chainId)

    // console.log('dang', {request, chainId, adapter, manager: getChainAdapterManager(), input: {
    //   to: request.to,
    //   value: bnOrZero(request.value).toFixed(0),
    //   chainSpecific: {
    //     from: address,
    //     contractAddress: request.to,
    //   },
    // }})

    // ETH

    return (adapter as unknown as EvmBaseAdapter<EvmChainId>).getFeeData({
      to: request.to,
      value: request.value, // bnOrZero(request.value).toFixed(0),
      chainSpecific: {
        from: address,
        contractAddress: request.to,
        contractData: request.data,
      },
    })
  }, [address, request, connectedChainId])

  useEffect(() => {
    fetchFees().then(setFees)
  }, [fetchFees])

  return fees
}
