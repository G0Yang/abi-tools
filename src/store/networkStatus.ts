import { create } from 'zustand'

type UseNetworkStatus = {
  status: any
}

type UseNetworkStatusActions = {
  reset: () => void
  set: (status: any) => void
}

export const useNetworkStatus = create<Partial<UseNetworkStatus> & UseNetworkStatusActions>(set => ({
  status: undefined,
  reset: () =>
    set(() => {
      return { status: undefined }
    }),
  set: (status: any) =>
    set(() => {
      return { status }
    })
}))
