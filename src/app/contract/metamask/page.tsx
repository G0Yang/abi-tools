'use client'

import * as React from 'react'
import { useProvider } from '@/src/store/provider'
import { useEffect } from 'react'
import ContractPenal from '@/src/components/contractPenal'
import { useContractState } from '@/src/define/useLocalStorageState'
import { BrowserProvider } from 'ethers'

export default function MetamaskPage() {
  const { setMetamask, reset } = useProvider()
  const [contracts] = useContractState()

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any)?.ethereum)
      setMetamask(new BrowserProvider((window as any).ethereum))
    else reset()
  }, [])

  if (!contracts || !window) return <></>

  return contracts.map((cont, id) => <ContractPenal key={cont.key} cId={id} contract={cont} />)
}
