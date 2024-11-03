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

export default function Init({ children }: { children: React.ReactNode }) {
  const [contracts, setContracts] = useContractState()
  const [networks, setNetworks] = useNetworksState()
  const [apiKeys, setApiKeys] = useApiKeysState()
  const [rpcUrl, setRpcUrl] = useRpcUrlState()
  const [accounts, setAccounts] = useAccountsState()

  useEffect(() => {
    if (rpcUrl) {
      const provider = new JsonRpcProvider(rpcUrl)
      provider.getNetwork().then(result => {
        console.log('rpcUrl changed', result)
      })
    }
  }, [rpcUrl])

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
