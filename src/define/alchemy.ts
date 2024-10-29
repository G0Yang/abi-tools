import { NetworkType } from '@/src/define/types'

const ALCHEMY_VERSION = 'v2'

export const alchemyNetworks: (key: string) => NetworkType[] = (key: string) => [
  {
    provider: 'alchemy',
    url: `https://eth-mainnet.g.alchemy.com/${ALCHEMY_VERSION}/${key}`,
    mainnet: 'ethereum',
    subnet: 'mainnet'
  },
  {
    provider: 'alchemy',
    url: `https://eth-sepolia.g.alchemy.com/${ALCHEMY_VERSION}/${key}`,
    mainnet: 'ethereum',
    subnet: 'sepolia'
  },

  {
    provider: 'alchemy',
    url: `https://polygon-mainnet.g.alchemy.com/${ALCHEMY_VERSION}/${key}`,
    mainnet: 'polygon',
    subnet: 'mainnet'
  },
  {
    provider: 'alchemy',
    url: `https://polygon-amoy.g.alchemy.com/${ALCHEMY_VERSION}/${key}`,
    mainnet: 'polygon',
    subnet: 'amoy'
  }
]
