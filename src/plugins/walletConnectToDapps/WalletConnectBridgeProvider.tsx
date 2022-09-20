import { HDWalletWCBridge } from '@shapeshiftoss/hdwallet-walletconnect-bridge'
import { WalletConnectCallRequest } from '@shapeshiftoss/hdwallet-walletconnect-bridge/dist/types'
import { useWallet } from 'hooks/useWallet/useWallet'
import type { FC, PropsWithChildren } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { CallRequestModal } from './components/modal/callRequest/CallRequestModal'
import { WalletConnectBridgeContext } from './WalletConnectBridgeContext'

export const WalletConnectBridgeProvider: FC<PropsWithChildren> = ({ children }) => {
  const wallet = useWallet().state.wallet
  const [bridge, setBridge] = useState<HDWalletWCBridge>()
  const [callRequests, setCallRequests] = useState<WalletConnectCallRequest[]>([])
  const onCallRequest = useCallback((request: WalletConnectCallRequest) => setCallRequests((prev) => [...prev, request]), []);

  const [, setTick] = useState(0)
  const rerender = useCallback(() => setTick(prev => prev + 1), [])

  const disconnect = useCallback(async () => {
    await bridge?.disconnect()
    setBridge(undefined)
  }, [bridge])

  const connect = useCallback(
    async (uri: string) => {
      if (!wallet) {
        alert('TODO: No HDWallet connected')
        return
      }
      if (!('_supportsETH' in wallet)) {
        alert('TODO: No ETH HDWallet connected')
        return
      }

      const newBridge = HDWalletWCBridge.fromURI(uri, wallet, {onCallRequest})
      newBridge.connector.on('connect', rerender)
      newBridge.connector.on('disconnect', disconnect)
      await newBridge.connect()
      setBridge(newBridge)
    },
    [wallet, disconnect, rerender, onCallRequest],
  )

  const tryConnectingToExistingSession = useCallback(async () => {
    if (!!bridge) return;
    if (!wallet || !('_supportsETH' in wallet)) return

    const wcSessionJsonString = localStorage.getItem('walletconnect')
    if (!wcSessionJsonString) {
      return
    }

    const session = JSON.parse(wcSessionJsonString)
    const existingBridge = HDWalletWCBridge.fromSession(session, wallet, {onCallRequest})
    existingBridge.connector.on('connect', rerender)
    existingBridge.connector.on('disconnect', disconnect)
    await existingBridge.connect()
    setBridge(existingBridge)
  }, [!!bridge, wallet, disconnect, rerender, onCallRequest])

  useEffect(() => {
    tryConnectingToExistingSession()
  }, [tryConnectingToExistingSession])

  console.log('call reqs...', callRequests);

  const dapp = bridge?.connector.peerMeta ?? undefined;

  return (
    <WalletConnectBridgeContext.Provider value={{ bridge, dapp, callRequests, connect, disconnect }}>
      {children}
      <CallRequestModal callRequest={callRequests[0]} />
    </WalletConnectBridgeContext.Provider>
  )
}
