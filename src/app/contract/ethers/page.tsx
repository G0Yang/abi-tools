'use client'

import * as React from 'react'
import { useContractState, useRpcUrlState } from '@/src/define/useLocalStorageState'
import ContractPenal from '@/src/components/contractPenal'
import { useProvider } from '@/src/store/provider'
import { useEffect } from 'react'

export default function EthersPage() {
  const { setRpcUrl, reset } = useProvider()
  const [rpcUrl] = useRpcUrlState()
  const [contracts] = useContractState()

  useEffect(() => {
    if (rpcUrl) setRpcUrl(rpcUrl)
    else reset()
  }, [])

  if (!contracts) return <></>

  return contracts.map((cont, id) => <ContractPenal key={cont.key} cId={id} contract={cont} />)
}
