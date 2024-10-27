import {create} from 'zustand';
import {persist} from 'zustand/middleware'
import {NetworkType} from "@/src/define/types";

type UseCustomUrl = {
    networks: NetworkType[];
}

type UseCustomUrlActions = {
    add: (networks?: NetworkType[]) => void;
    remove: (urlOrIndex: string | number) => void;
    update: (urlOrIndex: string | number, data: NetworkType) => void;
    reset: () => void;
}

const emptyNetwork: NetworkType = {provider: "", url: ""}

export const useCustomUrl = create(
    persist<UseCustomUrl & UseCustomUrlActions>(
        (set) => ({
            initialState: [],
            reset: () => set((state: UseCustomUrl) => {
                state.networks = [];
                return {}
            }),
            networks: [] as NetworkType[],
            add: (networks?: NetworkType[]) => set((state: UseCustomUrl) => {
                if(networks) {
                    state.networks = state.networks.concat(networks)
                }else {
                    state.networks = [...state.networks, emptyNetwork]
                }
                return state
            }),
            remove: (urlOrIndex: string | number) => set((state: UseCustomUrl) => {
                if (typeof urlOrIndex === "string") {
                    return {
                        networks: state.networks.filter(({url}) => url !== urlOrIndex)
                    }
                }
                return {
                    networks: state.networks.filter((_, idx) => idx !== urlOrIndex)
                }
            }),
            update: (urlOrIndex: string | number, data: NetworkType) => set((state: UseCustomUrl) => {
                if (typeof urlOrIndex === "string") {
                    const index = state.networks.findIndex(({url}) => url !== urlOrIndex)
                    if (index < 0 || state.networks.length <= index) throw new Error(`can't find any url (${urlOrIndex})`)
                    state.networks[index] = data
                } else {
                    state.networks[urlOrIndex] = data
                }
                return {
                    networks: state.networks
                }
            }),
        }), {name: "at-customUrl"}));
