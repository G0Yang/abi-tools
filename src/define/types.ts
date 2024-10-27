export type AccountType = {
    alias: string;
    address: string;
    privateKey: string;
    mnemonic?: string;
    path?: string | null;
    entropy?: string;
}

export type ContractInfoType = {
    contractName: string;
    abi: any[];
    bytecode: string;
    deployedBytecode: string;
    /* todo: https://docs.soliditylang.org/en/latest/using-the-compiler.html#output-description
     * userdoc, devdoc, metadata, storageLayout, transientStorageLayout, evm
     */
}

export type NetworkType = {
    mainnet: string;
    subnet: string;
    url: string;
    explorer?: string;
    chainId?: number;
}
