'use client'

import * as React from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { useABI } from '@/src/store/abiStore'

export default function ContractSelect(props: any) {
  const { contractInfo } = useABI()

  return (
    <Autocomplete
      fullWidth
      {...props}
      renderInput={params => <TextField {...params} label='Select Contract' />}
      options={Object.keys(contractInfo).concat([''])}
    />
  )
}
