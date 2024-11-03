import { JsonFragment } from 'ethers'

export type AccountType = {
  alias: string
  address: string
  privateKey: string
  mnemonic?: string
  path?: string | null
  entropy?: string
}

export type ArtifactType = {
  contractName: string
  abi: JsonFragment[]
  bytecode: string
  deployedBytecode: string

  /* todo: https://docs.soliditylang.org/en/latest/using-the-compiler.html#output-description
   * userdoc, devdoc, metadata, storageLayout, transientStorageLayout, evm
   */
}

export type ContractType = {
  alias: string
  target: string
  signer: string
  contractName: string
  key: string
  abi: JsonFragment[]
}

export type NetworkType = {
  provider: string
  url: string
  mainnet?: string
  subnet?: string
  explorer?: string
  chainId?: number
}
