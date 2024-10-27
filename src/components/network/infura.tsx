import {NetworkType} from "@/src/define/types";

const INFURA_VERSION = "v3"

// todo: https://docs.infura.io/api/network-endpoints
export const infuraNetworks: (key: string) => NetworkType[] = (key: string) => [
    {provider: "infura", url: `https://arbitrum-mainnet.infura.io/${INFURA_VERSION}/${key}`, mainnet: "arbitrum", subnet: "mainnet"},
    {provider: "infura", url: `https://arbitrum-sepolia.infura.io/${INFURA_VERSION}/${key}`, mainnet: "arbitrum", subnet: "sepolia"},
    {provider: "infura", url: `https://avalanche-mainnet.infura.io/${INFURA_VERSION}/${key}`, mainnet: "avalanche", subnet: "mainnet"},
    {provider: "infura", url: `https://avalanche-fuji.infura.io/${INFURA_VERSION}/${key}`, mainnet: "avalanche", subnet: "fuji"},
]

