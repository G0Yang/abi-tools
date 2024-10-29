import { NetworkType } from '@/src/define/types'

const INFURA_VERSION = 'v3'

// todo: https://docs.infura.io/api/network-endpoints
export const infuraNetworks: (key: string) => NetworkType[] = (key: string) => [
  {
    provider: 'infura',
    url: `https://arbitrum-mainnet.infura.io/${INFURA_VERSION}/${key}`,
    mainnet: 'arbitrum',
    subnet: 'mainnet'
  },
  {
    provider: 'infura',
    url: `https://arbitrum-sepolia.infura.io/${INFURA_VERSION}/${key}`,
    mainnet: 'arbitrum',
    subnet: 'sepolia'
  },

  {
    provider: 'infura',
    url: `https://avalanche-mainnet.infura.io/${INFURA_VERSION}/${key}`,
    mainnet: 'avalanche',
    subnet: 'mainnet'
  },
  {
    provider: 'infura',
    url: `https://avalanche-fuji.infura.io/${INFURA_VERSION}/${key}`,
    mainnet: 'avalanche',
    subnet: 'fuji'
  },

  {
    provider: 'infura',
    url: `https://base-mainnet.infura.io/${INFURA_VERSION}/${key}`,
    mainnet: 'base',
    subnet: 'mainnet'
  },
  {
    provider: 'infura',
    url: `https://base-sepolia.infura.io/${INFURA_VERSION}/${key}`,
    mainnet: 'base',
    subnet: 'sepolia'
  },

  {
    provider: 'infura',
    url: `https://bsc-mainnet.infura.io/${INFURA_VERSION}/${key}`,
    mainnet: 'bsc',
    subnet: 'mainnet'
  },
  {
    provider: 'infura',
    url: `https://bsc-testnet.infura.io/${INFURA_VERSION}/${key}`,
    mainnet: 'bsc',
    subnet: 'testnet'
  },

  {
    provider: 'infura',
    url: `https://mainnet.infura.io/${INFURA_VERSION}/${key}`,
    mainnet: 'ethereum',
    subnet: 'mainnet'
  },
  {
    provider: 'infura',
    url: `https://holesky.infura.io/${INFURA_VERSION}/${key}`,
    mainnet: 'ethereum',
    subnet: 'holesky'
  },
  {
    provider: 'infura',
    url: `https://sepolia.infura.io/${INFURA_VERSION}/${key}`,
    mainnet: 'ethereum',
    subnet: 'sepolia'
  },

  {
    provider: 'infura',
    url: `https://polygon-mainnet.infura.io/${INFURA_VERSION}/${key}`,
    mainnet: 'polygon',
    subnet: 'mainnet'
  },
  {
    provider: 'infura',
    url: `https://polygon-amoy.infura.io/${INFURA_VERSION}/${key}`,
    mainnet: 'polygon',
    subnet: 'amoy'
  }
]
