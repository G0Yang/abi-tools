'use client'

import * as React from 'react'
import { MenuItem, Select } from '@mui/material'
import { useNetworksState, useRpcUrlState } from '@/src/define/useLocalStorageState'

export default function NetworkSelect() {
  const [networks] = useNetworksState()
  const [rpcUrl, setRpcUrl] = useRpcUrlState()

  if (!networks || !rpcUrl) return <></>

  return (
    <Select fullWidth value={rpcUrl} onChange={e => setRpcUrl(e.target.value)} variant={'filled'}>
      <MenuItem value={' '}>None</MenuItem>)
      {networks.map(({ url }, key) => (
        <MenuItem key={key} value={url}>
          {url}
        </MenuItem>
      ))}
    </Select>
  )
}
