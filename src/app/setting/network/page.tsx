'use client'

import * as React from 'react'
import { DataGrid, GridActionsCellItem, GridRowModel, GridToolbar, GridToolbarContainer } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import SecurityIcon from '@mui/icons-material/Security'
import type { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef'
import { Box, Button, FormControlLabel, Grid2, Radio, Switch, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { NetworkType } from '@/src/define/types'
import { useNotifications } from '@toolpad/core'
import { useEffect } from 'react'
import { initData, useApiKeysState, useNetworksState, useRpcUrlState } from '@/src/define/useLocalStorageState'
import { alchemyNetworks, infuraNetworks } from '@/src/define/networkInfos'

export default function NetworkPage() {
  const [{ show }, showOptions] = [useNotifications(), { autoHideDuration: 3000 }]

  const [networks, setNetworks] = useNetworksState()
  const [apiKeys, setApiKeys] = useApiKeysState()
  const [rpcUrl, setRpcUrl] = useRpcUrlState()

  useEffect(() => {
    if (!apiKeys || !networks) return
    let filter = networks.filter(item => item.provider !== 'infura' && item.provider !== 'alchemy')

    if (apiKeys.alchemy.enabled) filter = filter.concat(alchemyNetworks(apiKeys.alchemy.key))

    if (apiKeys.infura.enabled) filter = filter.concat(infuraNetworks(apiKeys.infura.key))

    setNetworks(filter)
  }, [apiKeys])

  if (!networks || !apiKeys || !rpcUrl) return <></>

  const columns: GridColDef[] = [
    {
      field: 'bypass_group_id',
      headerName: ' ',
      width: 40,
      renderCell: params => {
        return (
          <Radio checked={rpcUrl === params.row.url} value={params.id} onChange={() => setRpcUrl(params.row.url)} />
        )
      }
    },
    {
      field: 'provider',
      width: 80
    },
    {
      field: 'url',
      minWidth: 200,
      flex: 1,
      editable: true
    },
    {
      field: 'mainnet',
      width: 120
    },
    {
      field: 'subnet',
      width: 120
    },
    {
      field: 'explorer',
      minWidth: 200,
      flex: 1
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
          onClick={() => {
            // todo: TypeError: Cannot read properties of undefined (reading 'id')
            setNetworks(networks.filter((_, id) => id !== params.id))
          }}
        />,
        <GridActionsCellItem
          key={`key-details-${params.id}`}
          icon={<SecurityIcon />}
          label='Show Details'
          onClick={() => onClickShowDetails(params.row)}
          showInMenu
        />
      ]
    }
  ]

  const onClickShowDetails = (row: any) => {
    // todo: show details modal
    console.log('show details', row)
  }

  const processRowUpdate = (newRow: GridRowModel) => {
    networks[newRow.id] = newRow as NetworkType
    setNetworks(networks)

    show(`updated ${newRow.id}`, showOptions)

    return networks
  }

  function EditToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbar />
        <Button
          color='primary'
          startIcon={<AddIcon />}
          onClick={() => {
            if (!networks) return
            setNetworks(networks.concat([{ provider: 'custom', url: '' }]))
          }}
        >
          Add
        </Button>
        <Button color='primary' startIcon={<AddIcon />} onClick={() => setNetworks(initData.networks)}>
          reset
        </Button>
      </GridToolbarContainer>
    )
  }

  return (
    <Grid2 container direction={'column'} sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ p: 1 }}>
        <FormControlLabel
          control={<Switch defaultChecked={apiKeys.infura.enabled} />}
          label='Enable Infura'
          onChange={(_, checked) => {
            apiKeys.infura.enabled = checked
            setApiKeys(apiKeys)
          }}
        />
        <TextField
          label={'API-KEY'}
          disabled={!apiKeys.infura.enabled}
          type='password'
          size='small'
          value={apiKeys.infura.key}
          onChange={e => {
            apiKeys.infura.key = e.target.value
            setApiKeys(apiKeys)
          }}
        />
        <FormControlLabel
          control={<Switch defaultChecked={apiKeys.alchemy.enabled} />}
          label='Enable Alchemy'
          onChange={(_, checked) => {
            apiKeys.alchemy.enabled = checked
            setApiKeys(apiKeys)
          }}
        />
        <TextField
          label={'API-KEY'}
          disabled={!apiKeys.alchemy.enabled}
          type='password'
          size='small'
          value={apiKeys.alchemy.key}
          onChange={e => {
            apiKeys.alchemy.key = e.target.value
            setApiKeys(apiKeys)
          }}
        />
      </Box>
      <DataGrid
        disableRowSelectionOnClick
        rows={networks.map((item, id) => ({ ...item, id }))}
        columns={columns}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 25
            }
          }
        }}
        sx={{ display: 'grid', height: '100%', alignContent: 'start' }}
        slotProps={{
          loadingOverlay: {
            variant: 'skeleton',
            noRowsVariant: 'skeleton'
          }
        }}
      />
    </Grid2>
  )
}
