'use client'

import * as React from 'react'
import { Grid2 } from '@mui/material'
import { useState } from 'react'
import { SearchTextField } from '@/src/components/core/toolbarActions/search'

export default function DebugPage() {
  const [encodeString, setEncodeString] = useState<string>('')

  const onClickDebug = () => {
    console.log({ encodeString })
  }

  return (
    <Grid2 sx={{ p: 1 }}>
      <SearchTextField
        label={'encoded string'}
        value={encodeString}
        onChange={e => setEncodeString(e.target.value)}
        onSlotButtonClick={onClickDebug}
        sx={{ width: '100%' }}
      />
    </Grid2>
  )
}
