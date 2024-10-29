import { defaultNetworks } from '@/src/define/defaultNetwork'

export const keys = {
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

export const options = { codec: JSON }
