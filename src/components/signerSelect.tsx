'use client'

import * as React from 'react'
import { Box, IconButton, MenuItem, Select } from '@mui/material'
import { SelectProps } from '@mui/material/Select/Select'
import { useAccountsState } from '@/src/define/useLocalStorageState'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

export default function SignerSelect(props: Partial<SelectProps<any>>) {
  const [accounts] = useAccountsState()
  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address).catch(console.warn)
  }

  if (!accounts) return <></>

  return (
    <Box width={'100%'} sx={{ mt: 1 }}>
      <Select {...props} fullWidth label='Select Signer' displayEmpty={true} variant={'standard'}>
        {accounts.map(({ address }, key) => (
          <MenuItem key={key} value={address}>
            {address}
          </MenuItem>
        ))}
      </Select>
      <IconButton size='small' onClick={() => handleCopy(props?.value)} sx={{ marginLeft: 'auto' }}>
        <ContentCopyIcon fontSize='small' />
      </IconButton>
    </Box>
  )
}
