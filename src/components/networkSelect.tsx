'use client'

import * as React from 'react'
import { MenuItem, Select } from '@mui/material'
import { useLocalStorageState } from '@toolpad/core'
import { NetworkType } from '@/src/define/types'
import { initData, keys, options } from '@/src/define/useLocalStorageState'

export default function NetworkSelect() {
  const [networks] = useLocalStorageState<NetworkType[]>(keys.networks, initData.networks, options)
  const [rpcUrl, setRpcUrl] = useLocalStorageState<string>(keys.rpcUrl, initData.rpcUrl)

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
