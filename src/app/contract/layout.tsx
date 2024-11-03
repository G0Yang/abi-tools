'use client'

import * as React from 'react'
import { Button, Divider, Grid2, Toolbar } from '@mui/material'
import { v4 } from 'uuid'
import { ContractType } from '@/src/define/types'
import { useContractState } from '@/src/define/useLocalStorageState'

export default function ContractLayout({ children }: { children: React.ReactNode }) {
  const [contracts, setContracts] = useContractState()

  if (!contracts) return <></>

  return (
    <Grid2 container direction={'row'} display={'grid'}>
      <Toolbar>
        <Button onClick={() => setContracts([...contracts, { key: v4() } as ContractType])}>add</Button>
      </Toolbar>
      <Divider />
      <Grid2 container overflow={'scroll'} flexWrap={'nowrap'} paddingX={1} height={'100%'}>
        {children}
      </Grid2>
    </Grid2>
  )
}
