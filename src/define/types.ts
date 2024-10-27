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
}
