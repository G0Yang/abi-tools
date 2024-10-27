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
import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { NetworkType} from "@/src/define/types";
import {useNotifications} from "@toolpad/core";
import {useCustomUrl} from "@/src/store/customUrlStore";

export default function NetworkPage() {
    const {networks, add, remove, reset, update} = useCustomUrl()
    const [{show}, showOptions] = [useNotifications(), {autoHideDuration: 3000}];

    const columns: GridColDef[] = [
        {
            field: "chainId",
            width: 80,
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
            field: "url",
            width: 600,
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
                    onClick={() => remove(params.id)}
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


    const processRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {
        const newAccount = {...newRow}
        delete newAccount.id
        update(oldRow.id, newRow as NetworkType)
        show(`update ${oldRow.mainnet}-${oldRow.subnet} : ${oldRow.url}`, showOptions)
        return newRow
    };


    function EditToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbar/>
                <Button color="primary" startIcon={<AddIcon/>} onClick={() => add([{mainnet: "custom", subnet: "custom", url: ""}])}>
                    Add
                </Button>
                <Button color="primary" startIcon={<AddIcon/>} onClick={reset}>
                    reset
                </Button>
            </GridToolbarContainer>
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
            sx={{ display: 'grid', height: "100%", alignContent: "start" }}
            slotProps={{
                loadingOverlay: {
                    variant: 'skeleton',
                    noRowsVariant: 'skeleton',
                },
            }}
        />
    );
}
