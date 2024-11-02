import { defaultNetworks } from '@/src/define/defaultNetwork'
import { useLocalStorageState } from '@toolpad/core'
import { AccountType, ContractType, NetworkType } from '@/src/define/types'

const keys = {
  networks: 'at-networks',
  apiKeys: 'at-apiKeys',
  rpcUrl: 'at-networkUrl',
  accounts: 'at-accounts',
  contracts: 'at-contracts'
}

export const initData = {
  networks: defaultNetworks,
  apiKeys: { infura: { enabled: false, key: '' }, alchemy: { enabled: false, key: '' } },
  rpcUrl: defaultNetworks[0].url,
  accounts: [],
  contracts: []
}

const options = { codec: JSON }

export const useContractState = () => useLocalStorageState<ContractType[]>(keys.contracts, initData.contracts, options)
export const useNetworksState = () => useLocalStorageState<NetworkType[]>(keys.networks, initData.networks, options)
export const useApiKeysState = () => useLocalStorageState<any>(keys.apiKeys, initData.apiKeys, options)
export const useRpcUrlState = () => useLocalStorageState<string>(keys.rpcUrl, initData.rpcUrl)
export const useAccountsState = () => useLocalStorageState<AccountType[]>(keys.accounts, initData.accounts, options)
