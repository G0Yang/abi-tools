import {create} from 'zustand';
import {AccountType} from "@/src/define/types";
import {v4} from "uuid";
import {Wallet} from "ethers";

type UseAccounts = {
    accounts: AccountType[];
    add: (pk?: string) => any;
    remove: (alias: string) => any;
    random: () => any;
}

export const emptyAccount = (pk?: string): AccountType =>
    ({alias: v4(), address: pk ? (new Wallet(pk)).address : "", privateKey: pk || ""})

export const randomAccount = (): AccountType => {
    const wallet = Wallet.createRandom()
    return {
        alias: v4(),
        address: wallet.address,
        privateKey: wallet.privateKey,
        mnemonic: wallet.mnemonic?.phrase,
        entropy: wallet.mnemonic?.entropy,
        path: wallet?.path,
    }
}

export const useAccounts = create<UseAccounts>((set) => ({
    accounts: [] as AccountType[],
    add: (pk?: string) => set((state: any) => ({accounts: [...state.accounts, emptyAccount(pk)]})),
    remove: (alias: string) => set((state: any) => ({accounts: state.accounts.filter((item: AccountType) => item.alias !== alias)})),
    random: () => set((state: any) => ({accounts: [...state.accounts, randomAccount()]})),
}));

