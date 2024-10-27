import {create} from 'zustand';
import {ContractInfoType} from "@/src/define/types";
import {persist, createJSONStorage} from 'zustand/middleware'

type UseContractInfoType = { [key in string]: ContractInfoType }

type UseABI = {
    contractInfo: UseContractInfoType;
}

type UseABIActions = {
    add: (infos: ContractInfoType[]) => void;
    remove: (contractName: string) => void;
    reset: () => void;
}

export const useABI = create(
    persist<UseABI & UseABIActions>(
        (set) => ({
            initialState: {} as UseContractInfoType,
            contractInfo: {} as UseContractInfoType,
            add: (infos: ContractInfoType[]) => set((state: UseABI) => {
                for (const info of infos) {
                    state.contractInfo[info.contractName] = info
                }
                return state
            }),
            remove: (contractName: string) => set((state: UseABI) => {
                delete state.contractInfo[contractName]
                return state
            }),
            reset: () => set((state: UseABI) => {
                state.contractInfo = {};
                return state
            }),
        }), {
            name: "at-contractInfo",
            // storage: createJSONStorage(() => sessionStorage)
        }));
