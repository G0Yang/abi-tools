'use client'

import * as React from 'react'
import { IconButton, TextField, Tooltip, Modal, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useEffect, useState } from 'react'
import { TextFieldProps } from '@mui/material/TextField/TextField'
import { useRpcUrlState } from '@/src/define/useLocalStorageState'
import { useSearchParams } from 'next/navigation'

const modalStyle = {
  position: 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
}

export function SearchTextField(props: Omit<TextFieldProps, 'variant'> & { onSlotButtonClick: () => any }) {
  if (!props) return <></>

  const newProps: any = { ...props }
  delete newProps.onSlotButtonClick

  return (
    <TextField
      {...newProps}
      variant='outlined'
      size='small'
      slotProps={{
        input: {
          endAdornment: (
            <IconButton type='button' aria-label='search' size='small' onClick={props.onSlotButtonClick}>
              <SearchIcon />
            </IconButton>
          ),
          sx: { pr: 0.5 }
        }
      }}
      onKeyDown={({ key }) => key === 'Enter' && props.onSlotButtonClick()}
    />
  )
}

export default function Search() {
  const searchParams = useSearchParams()
  const [rpcUrl, setRpcUrl] = useRpcUrlState()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')

  useEffect(() => {
    const hash = searchParams.get('hash')
    if (hash) setSearchText(hash)
  }, [searchParams])

  const onSearch = async () => {
    if (!searchText.startsWith('0x') || !rpcUrl) return

    // @ts-ignore
    window.location = `/tools/search?hash=${searchText}&url=${rpcUrl}`
  }

  if (!rpcUrl) {
    setRpcUrl('')

    return <></>
  }

  return (
    <React.Fragment>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={modalStyle}>
          <SearchTextField
            onSlotButtonClick={onSearch}
            label={'Tx, BlockHash, Address'}
            sx={{ width: '100%' }}
            value={searchText}
            onChange={e => setSearchText(e.target.value.trimEnd())}
          />
        </Box>
      </Modal>
      <Tooltip title='Search' onClick={() => setModalOpen(true)}>
        <div>
          <IconButton
            type='button'
            aria-label='search'
            sx={{
              display: { xs: 'inline', md: 'none' }
            }}
          >
            <SearchIcon />
          </IconButton>
        </div>
      </Tooltip>
      <SearchTextField
        onSlotButtonClick={onSearch}
        label={'Tx, BlockHash, Address'}
        sx={{ display: { xs: 'none', md: 'inline-block' }, mr: 1 }}
        value={searchText}
        onChange={e => setSearchText(e.target.value.trimEnd())}
      />
    </React.Fragment>
  )
}
