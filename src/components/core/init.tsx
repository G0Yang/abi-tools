import { useLocalStorageState } from '@toolpad/core'
import { AccountType, ContractType, NetworkType } from '@/src/define/types'
import { initData, keys, options } from '@/src/define/useLocalStorageState'
import * as React from 'react'

export default function Init({ children }: { children: React.ReactNode }) {
  const [networks, setNetworks] = useLocalStorageState<NetworkType[]>(keys.networks, initData.networks, options)
  const [apiKeys, setApiKeys] = useLocalStorageState<any>(keys.apiKeys, initData.apiKeys, options)
  const [rpcUrl, setRpcUrl] = useLocalStorageState<string>(keys.rpcUrl, initData.rpcUrl)
  const [accounts, setAccounts] = useLocalStorageState<AccountType[]>(keys.accounts, initData.accounts, options)
  const [contracts, setContracts] = useLocalStorageState<ContractType[]>(keys.accounts, initData.accounts, options)

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
