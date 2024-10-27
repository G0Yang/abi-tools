'use client';

import * as React from 'react';
import {
    DataGrid,
    GridActionsCellItem, GridRowModel,
    GridToolbar,
    GridToolbarContainer,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import type {GridColDef} from "@mui/x-data-grid/models/colDef/gridColDef";
import {Box, Button, FormControlLabel, Grid2, Radio, Switch, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {NetworkType} from "@/src/define/types";
import {useLocalStorageState, useNotifications} from "@toolpad/core";
import {useEffect, useState} from "react";
import {alchemyNetworks} from "@/src/components/network/alchemy";
import {infuraNetworks} from "@/src/components/network/infura";

export default function NetworkPage() {
    const [{show}, showOptions] = [useNotifications(), {autoHideDuration: 3000}];

    const [networks, setNetworks] = useLocalStorageState<NetworkType[]>(
        'at-networks',
        [],
        {codec: JSON},
    );
    const [apiKeys, setApiKeys] = useLocalStorageState(
        'at-apiKeys',
        {
            infura: {enabled: false, key: ""},
            alchemy: {enabled: false, key: ""},
        },
        {codec: JSON},
    );

    const [selectionRow, setSelectionRow] = useState(1)


    useEffect(() => {
        if (!apiKeys || !networks) return
        let filter = networks.filter(item => item.provider !== "infura" && item.provider !== "alchemy")
        const alchemy = alchemyNetworks(apiKeys.alchemy.key)
        const infura = infuraNetworks(apiKeys.infura.key)
        if (apiKeys.alchemy.enabled) {
            filter = alchemy.concat(filter)
        }
        if (apiKeys.infura.enabled) {
            filter = infura.concat(filter)
        }
        setNetworks(filter)
    }, [apiKeys])


    if (!networks || !apiKeys) return <></>


    const columns: GridColDef[] = [
        {
            field: 'bypass_group_id',
            headerName: ' ',
            width: 40,
            renderCell: (params) => {
                return (
                    <Radio
                        checked={selectionRow === params.id} value={params.id}
                    />
                )
            }
        },
        {
            field: "provider",
            width: 80,
            editable: true,
        },
        {
            field: "url",
            width: 600,
            editable: true,
        },
        {
            field: "mainnet",
            width: 120,
            editable: true,
        },
        {
            field: "subnet",
            width: 120,
            editable: true,
        },
        {
            field: "explorer",
            width: 400,
            editable: true,
        },
        {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (params) => [
                <GridActionsCellItem
                    key={`key-delete-${params.id}`}
                    icon={<DeleteIcon/>}
                    label="Delete"
                    onClick={() => setNetworks(networks.filter((_, id) => id !== params.id))}
                />,
                <GridActionsCellItem
                    key={`key-details-${params.id}`}
                    icon={<SecurityIcon/>}
                    label="Show Details"
                    onClick={() => onClickShowDetails(params.row)}
                    showInMenu
                />,
            ],
        },
    ]

    const onClickShowDetails = (row: any) => {
        // todo: show details modal
        console.log("show details", row)
    }


    const processRowUpdate = (newRow: GridRowModel) => {
        networks[newRow.id] = newRow as NetworkType
        setNetworks(networks)

        show(`updated ${newRow.id}`, showOptions)

        return newRow
    };


    function EditToolbar() {
        return (
            <Grid2 sx={{p:1}}>
                <Box>
                    <FormControlLabel control={<Switch defaultChecked={apiKeys.infura.enabled}/>}
                                      label="Enable Infura" onChange={(_, checked) => {
                        apiKeys.infura.enabled = checked
                        setApiKeys(apiKeys)
                    }}/>
                    <TextField
                        label={"API-KEY"}
                        disabled={!apiKeys.infura.enabled}
                        type="password"
                        size="small"
                        value={apiKeys.infura.key}
                        onChange={e => {
                            apiKeys.infura.key = e.target.value
                            setApiKeys(apiKeys)
                        }}/>
                </Box>
                <Box>
                    <FormControlLabel control={<Switch defaultChecked={apiKeys.alchemy.enabled}/>}
                                      label="Enable Alchemy" onChange={(_, checked) => {
                        apiKeys.alchemy.enabled = checked
                        setApiKeys(apiKeys)
                    }}/>
                    <TextField
                        label={"API-KEY"}
                        disabled={!apiKeys.alchemy.enabled}
                        type="password"
                        size="small"
                        value={apiKeys.alchemy.key}
                        onChange={e => {
                            apiKeys.alchemy.key = e.target.value
                            setApiKeys(apiKeys)
                        }}/>
                </Box>

                <GridToolbarContainer>
                    <GridToolbar/>
                    <Button color="primary" startIcon={<AddIcon/>} onClick={() => {
                        if (!networks) return
                        setNetworks(networks.concat([{provider: "custom", url: ""}]))
                    }}>
                        Add
                    </Button>
                    <Button color="primary" startIcon={<AddIcon/>} onClick={() => setNetworks([])}>
                        reset
                    </Button>
                </GridToolbarContainer>
            </Grid2>
        );
    }

    return (<DataGrid
            disableRowSelectionOnClick
            rows={networks.map((item, id) => ({...item, id}))}
            columns={columns}
            processRowUpdate={processRowUpdate}
            slots={{
                toolbar: EditToolbar,
            }}
            sx={{display: 'grid', height: "100%", alignContent: "start"}}
            slotProps={{
                loadingOverlay: {
                    variant: 'skeleton',
                    noRowsVariant: 'skeleton',
                },
            }}
            onRowClick={({id}) => setSelectionRow(Number(id))}
        />
    );
}
