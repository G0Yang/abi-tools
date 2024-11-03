'use client'

import * as React from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { useABI } from '@/src/store/abiStore'
import { SelectInputProps } from '@mui/material/Select/SelectInput'

export default function ContractSelect(props: any & { onChange?: SelectInputProps<any>['onChange'] }) {
  const { contractInfo } = useABI()

  return (
    <Autocomplete
      defaultValue={''}
      {...props}
      fullWidth
      renderInput={params => <TextField {...params} label='Select Contract' />}
      options={Object.keys(contractInfo)}
    />
  )
}
