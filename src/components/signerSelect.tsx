'use client'

import * as React from 'react'
import { MenuItem, Select } from '@mui/material'
import { useLocalStorageState } from '@toolpad/core'
import { AccountType } from '@/src/define/types'
import { SelectProps } from '@mui/material/Select/Select'
import { initData, keys, options } from '@/src/define/useLocalStorageState'

export default function SignerSelect(props: SelectProps<any>) {
  const [accounts] = useLocalStorageState<AccountType[]>(keys.accounts, initData.accounts, options)

  if (!accounts) return <></>

  return (
    <Select {...props} label='Select Signer'>
      <MenuItem value={''}>None</MenuItem>)
      {accounts.map(({ address }, key) => (
        <MenuItem key={key} value={address}>
          {address}
        </MenuItem>
      ))}
    </Select>
  )
}
