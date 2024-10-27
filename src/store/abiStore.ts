import {create} from 'zustand';
import {ContractInfoType} from "@/src/define/types";
import {persist} from 'zustand/middleware'

type UseContractInfoType = { [key in string]: ContractInfoType }

type UseABI = {
    contractInfo: UseContractInfoType;
}

type UseABIActions = {
    add: (infos: ContractInfoType[]) => void;
    remove: (nameOrIndex: string | number) => void;
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
            remove: (nameOrIndex: string | number) => set((state: UseABI) => {
                if(typeof nameOrIndex === "string") {
                    delete state.contractInfo[nameOrIndex]
                } else {
                    delete state.contractInfo[Object.keys(state.contractInfo)[nameOrIndex]]
                }
                return state
            }),
            reset: () => set((state: UseABI) => {
                state.contractInfo = {};
                return state
            }),
        }), {
            name: "at-contractInfo",
        }));
