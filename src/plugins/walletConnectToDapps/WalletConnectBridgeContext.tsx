import { HDWalletWCBridge } from '@shapeshiftoss/hdwallet-walletconnect-bridge'
import { WalletConnectCallRequest } from '@shapeshiftoss/hdwallet-walletconnect-bridge/dist/types'
import { IClientMeta } from "@walletconnect/types"
import { createContext, useContext } from 'react'

type WalletConnectBridgeContextValue = {
  bridge: HDWalletWCBridge | undefined
  dapp: IClientMeta | undefined
  callRequests: WalletConnectCallRequest[];
  connect(uri: string): Promise<void>
  disconnect(): Promise<void>
}

export const WalletConnectBridgeContext = createContext<WalletConnectBridgeContextValue>({
  bridge: undefined,
  dapp: undefined,
  callRequests: [],
  connect: Promise.resolve,
  disconnect: Promise.resolve,
})

export function useWalletConnect() {
  return useContext(WalletConnectBridgeContext)
}
