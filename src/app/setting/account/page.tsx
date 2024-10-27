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
import {Button, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useAccounts} from "@/src/store/accountStore"
import {AccountType} from "@/src/define/types";
import {GridRenderCellParams} from "@mui/x-data-grid/models/params/gridCellParams";

export default function AccountPage() {
    const {accounts, add, remove, random, reset, update} = useAccounts()

    const columns: GridColDef[] = [
        {
            field: "alias",
            width: 280,
            editable: true,
        },
        {
            field: "address",
            width: 400,
        },
        {
            field: "privateKey",
            type: 'custom',
            width: 580,
            editable: true,
            display: 'flex',
            renderCell: ({value, id}: GridRenderCellParams) => <TextField key={id} type="password" fullWidth value={value}/>,
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
                    onClick={() => remove(params.id.toString())}
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
        update(oldRow.alias, newAccount as AccountType)
        return newRow
    };


    function EditToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbar/>
                <Button color="primary" startIcon={<AddIcon/>} onClick={() => add()}>
                    Add
                </Button>
                <Button color="primary" startIcon={<AddIcon/>} onClick={random}>
                    Random
                </Button>
                <Button color="primary" startIcon={<AddIcon/>} onClick={reset}>
                    reset
                </Button>
            </GridToolbarContainer>
        );
    }

    return (<DataGrid
            disableRowSelectionOnClick
            rows={accounts.map((item: AccountType, id) => ({...item, id}))}
            columns={columns}
            processRowUpdate={processRowUpdate}
            slots={{
                toolbar: EditToolbar,
            }}
            sx={{ display: 'grid', height: "100%", alignContent: "start" }}
            slotProps={{
                toolbar: {
                    csvOptions: {name: "accounts.csv"}
                },
                loadingOverlay: {
                    variant: 'skeleton',
                    noRowsVariant: 'skeleton',
                },
            }}
        />
    );
}
