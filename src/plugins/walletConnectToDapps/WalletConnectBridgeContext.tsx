import { HDWalletWCBridge } from '@shapeshiftoss/hdwallet-walletconnect-bridge'
import type { FC, PropsWithChildren } from 'react'
import { createContext, useCallback, useContext, useState } from 'react'
import { useWallet } from 'hooks/useWallet/useWallet'

type WalletConnectBridgeContextValue = {
  bridge: HDWalletWCBridge | undefined
  connect(uri: string): Promise<void>
}

const WalletConnectBridgeContext = createContext<WalletConnectBridgeContextValue>({
  bridge: undefined,
  connect: Promise.resolve,
})

export const WalletConnectBridgeProvider: FC<PropsWithChildren> = ({ children }) => {
  const wallet = useWallet().state.wallet
  const [bridge, setBridge] = useState<HDWalletWCBridge>()

  const connect = useCallback(async (uri: string) => {
    if (!wallet) {
      alert('TODO: No HDWallet connected')
      return
    }
    if (!('_supportsETH' in wallet)) {
      alert('TODO: No ETH HDWallet connected')
      return
    }

    const bridge = HDWalletWCBridge.fromURI(uri, wallet)
    await bridge.connect()
    setBridge(bridge)
  }, [])

  return (
    <WalletConnectBridgeContext.Provider value={{ bridge, connect }}>
      {children}
    </WalletConnectBridgeContext.Provider>
  )
}

export function useWalletConnect() {
  return useContext(WalletConnectBridgeContext)
}
