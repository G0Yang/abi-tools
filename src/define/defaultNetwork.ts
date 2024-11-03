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
