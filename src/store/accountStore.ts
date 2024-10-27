import {create} from 'zustand';
import {AccountType} from "@/src/define/types";
import {persist} from 'zustand/middleware'
import {v4} from "uuid";
import {Wallet} from "ethers";

type UseAccounts = {
    accounts: AccountType[];
}

type UseAccountsActions = {
    add: (pks?: string[]) => void;
    remove: (alias: string) => void;
    update: (alias: string, data: AccountType) => void;
    random: () => void;
    reset: () => void;
}

export const newAccount = (pk?: string): AccountType =>
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

export const useAccounts = create(
    persist<UseAccounts & UseAccountsActions>(
        (set) => ({
            initialState: [],
            reset: () => set((state: UseAccounts) => {
                state.accounts = [];
                return {}
            }),
            accounts: [] as AccountType[],
            add: (pks?: string[]) => set((state: UseAccounts) => ({accounts: pks ? state.accounts.concat(pks.map(pk => newAccount(pk))) : [...state.accounts, newAccount()]})),
            remove: (alias: string) => set((state: UseAccounts) => ({accounts: state.accounts.filter((item: AccountType) => item.alias !== alias)})),
            update: (alias: string, data: AccountType) => set((state: UseAccounts) => {
                const idx = state.accounts.findIndex(acc => acc.alias === alias)
                if (0 <= idx && idx < state.accounts.length)
                    state.accounts[idx] = data
                return state;
            }),
            random: () => set((state: UseAccounts) => ({accounts: [...state.accounts, randomAccount()]})),
        }), {name: "at-accounts"}));
