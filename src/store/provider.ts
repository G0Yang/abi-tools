import { create } from 'zustand'
import { JsonRpcProvider, Provider } from 'ethers'

type UseProvider = {
  provider: Provider
}

type UseProviderActions = {
  reset: () => void
  setRpcUrl: (rpcUrl: string) => void
  setMetamask: (metamask: any) => void
}

export const useProvider = create<Partial<UseProvider> & UseProviderActions>(set => ({
  provider: undefined,
  reset: () =>
    set(() => {
      return { provider: undefined }
    }),
  setRpcUrl: (rpcUrl: string) =>
    set(() => {
      return { provider: new JsonRpcProvider(rpcUrl) }
    }),
  setMetamask: (metamask: any) =>
    set(() => {
      return { provider: metamask }
    })
}))
