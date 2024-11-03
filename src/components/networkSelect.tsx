'use client'

import * as React from 'react'
import { MenuItem, Select } from '@mui/material'
import { useNetworksState, useRpcUrlState } from '@/src/define/useLocalStorageState'

export default function NetworkSelect() {
  const [networks] = useNetworksState()
  const [rpcUrl, setRpcUrl] = useRpcUrlState()

  if (!networks || !rpcUrl) return <></>

  return (
    <Select fullWidth defaultValue={''} value={rpcUrl} onChange={e => setRpcUrl(e.target.value)} variant={'filled'}>
      {networks.map(({ url, provider }, key) => (
        <MenuItem key={key} value={url}>
          [{provider}] {url}
        </MenuItem>
      ))}
    </Select>
  )
}
