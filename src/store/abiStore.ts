import {create} from 'zustand';
import {ArtifactType} from "@/src/define/types";
import {createJSONStorage, persist, StateStorage} from 'zustand/middleware'
import {get, set, del} from "idb-keyval"
import artifacts from "@/src/define/artifacts";


type UseContractInfoType = { [key in string]: ArtifactType }

type UseABI = {
    contractInfo: UseContractInfoType;
}

type UseABIActions = {
    add: (infos: ArtifactType[]) => void;
    remove: (name: string) => void;
    reset: () => void;
}

const storage: StateStorage = {
    getItem: async (name: string) => {
        return JSON.stringify(await get(name))
    },
    setItem: async (name: string, value: string) => {
        await set(name, JSON.parse(value))
    },
    removeItem: async (name: string) => {
        await del(name)
    }
}

export const useABI = create(
    persist<UseABI & UseABIActions>(
        (set) => ({
            contractInfo: artifacts as UseContractInfoType,
            add: (infos: ArtifactType[]) => set(({contractInfo}: UseABI) => {
                for (const info of infos) {
                    contractInfo[info.contractName] = info
                }
                return {contractInfo}
            }),
            remove: (name: string) => set(({contractInfo}: UseABI) => {
                delete contractInfo[name]
                return {contractInfo}
            }),
            reset: () => set(({contractInfo}: UseABI) => {
                contractInfo = artifacts as UseContractInfoType;
                return {contractInfo}
            }),
        }), {
            name: "at-contractInfo",
            storage: createJSONStorage(() => storage)
        }));
