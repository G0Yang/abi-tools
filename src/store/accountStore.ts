import {create} from 'zustand';
import {AccountType} from "@/src/define/types";
import {v4} from "uuid";

export const emptyAccount: () => AccountType = () => ({
    alias: v4(), address: "", privateKey: ""
})

type UseAccounts = {
    accounts: AccountType[];
    add: () => any;
    remove: (alias: string) => any;
}

export const useAccounts = create<UseAccounts>((set) => ({
    accounts: [] as AccountType[],
    add: () => set((state: any) => ({accounts: [...state.accounts, emptyAccount()]})),
    remove: (alias: string) => set((state: any) => ({accounts: state.accounts.filter((item: AccountType) => item.alias !== alias)})),
}));

