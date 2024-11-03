import { NetworkType } from '@/src/define/types'

export const defaultNetworks: NetworkType[] = [
  {
    provider: 'official',
    url: `https://public-en.node.kaia.io`,
    mainnet: 'kaia',
    subnet: 'mainnet',
    chainId: 8217,
    explorer: 'https://sepolia-explorer.base.org'
  },
  {
    provider: 'official',
    url: `https://public-en-kairos.node.kaia.io`,
    mainnet: 'kaia',
    subnet: 'kairos',
    chainId: 1001,
    explorer: 'https://kairos.kaiascan.io.'
  },
  {
    provider: 'official',
    url: `https://mainnet.base.org`,
    mainnet: 'base',
    subnet: 'mainnet',
    chainId: 8453,
    explorer: 'https://base.blockscout.com'
  },
  {
    provider: 'official',
    url: `https://sepolia.base.org`,
    mainnet: 'base',
    subnet: 'sepolia',
    chainId: 84532,
    explorer: 'https://sepolia-explorer.base.org'
  },
  {
    provider: 'official',
    url: `https://bsc-dataseed.binance.org`,
    mainnet: 'binance',
    subnet: 'mainnet',
    chainId: 56,
    explorer: 'https://bscscan.com'
  },
  {
    provider: 'official',
    url: `https://data-seed-prebsc-1-s1.binance.org:8545`,
    mainnet: 'binance',
    subnet: 'testnet',
    chainId: 97,
    explorer: 'https://testnet.bscscan.com'
  }
]

const INFURA_VERSION = 'v3'

// todo: https://docs.infura.io/api/network-endpoints
export const infuraNetworks: (key: string) => NetworkType[] = (key: string) => [
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
    url: `https://celo-mainnet.infura.io/${INFURA_VERSION}/${key}`,
    mainnet: 'celo',
    subnet: 'mainnet'
  },
  {
    provider: 'infura',
    url: `https://celo-alfajores.infura.io/${INFURA_VERSION}/${key}`,
    mainnet: 'celo',
    subnet: 'alfajores'
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
    url: `https://scroll-mainnet.infura.io/${INFURA_VERSION}/${key}`,
    mainnet: 'scroll',
    subnet: 'mainnet'
  },
  {
    provider: 'infura',
    url: `https://scroll-sepolia.infura.io/${INFURA_VERSION}/${key}`,
    mainnet: 'scroll',
    subnet: 'sepolia'
  }
]

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
