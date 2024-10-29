'use client'

import * as React from 'react'
import { useLocalStorageState } from '@toolpad/core'
import { ContractType } from '@/src/define/types'
import ContractPenal from '@/src/components/contractPenal'
import { initData, options, keys } from '@/src/define/useLocalStorageState'

export default function EthersPage() {
  const [contracts] = useLocalStorageState<ContractType[]>(keys.accounts, initData.accounts, options)

  if (!contracts) return <></>

  return contracts.map((cont, id) => <ContractPenal {...cont} key={cont.key} id={id} />)
}
