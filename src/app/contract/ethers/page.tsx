'use client'

import * as React from 'react'
import { useContractState } from '@/src/define/useLocalStorageState'
import ContractPenal from '@/src/components/contractPenal'

export default function EthersPage() {
  const [contracts] = useContractState()

  if (!contracts) return <></>

  return contracts.map((cont, id) => <ContractPenal key={cont.key} cId={id} contract={cont} />)
}
