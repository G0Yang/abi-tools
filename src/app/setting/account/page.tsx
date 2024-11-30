'use client'

import * as React from 'react'
import { DataGrid, GridActionsCellItem, GridRowModel, GridToolbar, GridToolbarContainer } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import SecurityIcon from '@mui/icons-material/Security'
import type { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef'
import { Box, Button, Modal, Table, TableBody, TableCell, TableRow, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { AccountType } from '@/src/define/types'
import { GridRenderCellParams } from '@mui/x-data-grid/models/params/gridCellParams'
import { useNotifications } from '@toolpad/core'
import { v4 } from 'uuid'
import { Wallet } from 'ethers'
import { useAccountsState } from '@/src/define/useLocalStorageState'
import { useState } from 'react'
import Typography from '@mui/material/Typography'

const modalStyle = {
  position: 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
}

export default function AccountPage() {
  const [{ show }, showOptions] = [useNotifications(), { autoHideDuration: 3000 }]
  const [accounts, setAccounts] = useAccountsState()
  const [modalData, setModalData] = useState<any | boolean>(false)

  if (!accounts) return <></>

  const columns: GridColDef[] = [
    {
      field: 'alias',
      minWidth: 100,
      editable: true,
      flex: 1
    },
    {
      field: 'address',
      minWidth: 200,
      flex: 1
    },
    {
      field: 'privateKey',
      type: 'custom',
      minWidth: 250,
      editable: true,
      flex: 1,
      renderCell: ({ value, id }: GridRenderCellParams) => (
        <TextField key={id} type='password' fullWidth value={value} />
      )
    },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: params => [
        <GridActionsCellItem
          key={`key-delete-${params.id}`}
          icon={<DeleteIcon />}
          label='Delete'
          onClick={() => setAccounts(accounts.filter((_, id) => id !== params.id))}
        />,
        <GridActionsCellItem
          key={`key-details-${params.id}`}
          icon={<SecurityIcon />}
          label='Show Details'
          onClick={() => setModalData(params.row)}
          showInMenu
        />
      ]
    }
  ]

  const processRowUpdate = (newRow: GridRowModel, { id }: GridRowModel) => {
    accounts[id] = newRow as AccountType
    setAccounts(accounts)

    show(`updated ${id}`, showOptions)

    return newRow
  }

  const newAccount = (pk?: string): AccountType => ({
    alias: v4(),
    address: pk ? new Wallet(pk).address : '',
    privateKey: pk || ''
  })

  const randomAccount = (): AccountType => {
    const wallet = Wallet.createRandom()

    return {
      alias: v4(),
      address: wallet.address,
      privateKey: wallet.privateKey,
      mnemonic: wallet.mnemonic?.phrase,
      entropy: wallet.mnemonic?.entropy,
      path: wallet?.path
    }
  }

  function EditToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbar />
        <Button
          color='primary'
          startIcon={<AddIcon />}
          onClick={() => accounts && setAccounts([...accounts].concat([newAccount()]))}
        >
          Add
        </Button>
        <Button
          color='primary'
          startIcon={<AddIcon />}
          onClick={() => {
            accounts && setAccounts([...accounts].concat([randomAccount()]))
            show(`Create New Wallet`, showOptions)
          }}
        >
          Random
        </Button>
        <Button color='primary' startIcon={<AddIcon />} onClick={() => setAccounts([])}>
          reset
        </Button>
      </GridToolbarContainer>
    )
  }

  return (
    <>
      <Modal open={!!modalData} onClose={() => setModalData(false)}>
        <Box sx={modalStyle}>
          <Typography variant='h1'>Account Details</Typography>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell align='right'>Alias</TableCell>
                <TableCell>{modalData.alias}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='right'>Address</TableCell>
                <TableCell>{modalData.address}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='right'>Private Key</TableCell>
                <TableCell>{modalData.privateKey}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='right'>Mnemonic</TableCell>
                <TableCell>{modalData.mnemonic}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='right'>Path</TableCell>
                <TableCell>{modalData.path}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='right'>Entropy</TableCell>
                <TableCell>{modalData.entropy}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button sx={{ float: 'right' }} onClick={() => setModalData(false)}>
            Close
          </Button>
        </Box>
      </Modal>
      <DataGrid
        disableRowSelectionOnClick
        rows={accounts.map((item, id) => ({ ...item, id }))}
        columns={columns}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={console.log}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 25
            }
          }
        }}
        slots={{
          toolbar: EditToolbar
        }}
        sx={{ display: 'grid', height: '100%', alignContent: 'start' }}
        slotProps={{
          toolbar: {
            csvOptions: { fileName: 'accounts' }
          },
          loadingOverlay: {
            variant: 'skeleton',
            noRowsVariant: 'skeleton'
          }
        }}
      />
    </>
  )
}
