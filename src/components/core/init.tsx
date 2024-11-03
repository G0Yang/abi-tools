import {
  initData,
  useContractState,
  useNetworksState,
  useApiKeysState,
  useRpcUrlState,
  useAccountsState
} from '@/src/define/useLocalStorageState'
import * as React from 'react'
import { useEffect } from 'react'
import { JsonRpcProvider } from 'ethers'
import { useNetworkStatus } from '@/src/store/networkStatus'
import { useProvider } from '@/src/store/provider'

export default function Init({ children }: { children: React.ReactNode }) {
  const [contracts, setContracts] = useContractState()
  const [networks, setNetworks] = useNetworksState()
  const [apiKeys, setApiKeys] = useApiKeysState()
  const [rpcUrl] = useRpcUrlState()
  const [accounts, setAccounts] = useAccountsState()

  const { set, reset: networkReset } = useNetworkStatus()
  const { provider, setRpcUrl } = useProvider()

  const networkInit = async () => {
    if (rpcUrl && provider) {
      const [network, clientVersion, netVersion] = (
        await Promise.allSettled([
          provider.getNetwork(),
          (provider as JsonRpcProvider).send('web3_clientVersion', []),
          (provider as JsonRpcProvider).send('net_version', [])
        ])
      ).map(res => (res.status === 'fulfilled' ? res.value : undefined))

      set({
        ...network.toJSON(),
        clientVersion,
        netVersion
      })
    }
  }

  useEffect(() => {
    provider?.destroy()
    if (rpcUrl) setRpcUrl(rpcUrl)
  }, [rpcUrl])

  useEffect(() => {
    networkInit().then().catch(networkReset)
  }, [provider])

  if (!networks) {
    setNetworks(initData.networks)

    return <></>
  }

  if (!apiKeys) {
    setApiKeys(initData.apiKeys)

    return <></>
  }

  if (!rpcUrl) {
    setRpcUrl(initData.rpcUrl)

    return <></>
  }

  if (!accounts) {
    setAccounts(initData.accounts)

    return <></>
  }

  if (!contracts) {
    setContracts(initData.contracts)

    return <></>
  }

  return <>{children}</>
}
