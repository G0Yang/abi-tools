export type AccountType = {
    alias: string;
    address: string;
    privateKey: string;
}

export type ContractInfoType = {
    contractName: string;
    abi: any[];
    bytecode: string;
    deployedBytecode: string;
}
