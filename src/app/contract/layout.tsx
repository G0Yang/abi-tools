'use client'

import * as React from 'react'
import { Button, Grid2, Toolbar } from '@mui/material'
import { v4 } from 'uuid'
import { ContractType } from '@/src/define/types'
import { useLocalStorageState } from '@toolpad/core'
import {initData, keys, options} from '@/src/define/useLocalStorageState'

export default function ContractLayout({ children }: { children: React.ReactNode }) {
  const [contracts, setContracts] = useLocalStorageState<ContractType[]>(keys.accounts, initData.accounts, options)

  if (!contracts || !window) return <></>

  return (
    <Grid2 width={'100%'}>
      <Toolbar>
        <Button onClick={() => setContracts([...contracts, { key: v4() } as ContractType])}>add</Button>
      </Toolbar>
      <Grid2
        container
        sx={{
          display: 'flex',
          flexWrap: 'nowrap',
          overflowX: 'scroll'

          // todo: horizontal scroll
          // width: { xs: width - 64, md: width - 320 },
          // height: '100%'
        }}
      >
        {children}
      </Grid2>
    </Grid2>
  )
}
