'use client'

import * as React from 'react'
import { useContractState, useRpcUrlState } from '@/src/define/useLocalStorageState'
import { useEffect } from 'react'
import { useProvider } from '@/src/store/provider'
import ContractPenal from '@/src/components/contractPenal'

export default function EthersPage() {
  const [rpcUrl] = useRpcUrlState()
  const { setRpcUrl, reset } = useProvider()
  const [contracts] = useContractState()

  useEffect(() => {
    if (rpcUrl) setRpcUrl(rpcUrl)
    else reset()
  }, [rpcUrl])

  if (!contracts || !window) return <></>

  return contracts.map((cont, id) => <ContractPenal key={cont.key} cId={id} contract={cont} />)
}
