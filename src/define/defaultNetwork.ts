import { NetworkType } from '@/src/define/types'

export const defaultNetworks: NetworkType[] = [
  {
    provider: 'default',
    url: `https://public-en.node.kaia.io`,
    mainnet: 'kaia',
    subnet: 'mainnet'
  },
  {
    provider: 'default',
    url: `https://public-en-kairos.node.kaia.io`,
    mainnet: 'kaia',
    subnet: 'kairos'
  }
]
