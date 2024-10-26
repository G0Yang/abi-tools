'use client';

import * as React from 'react';
import {
    DataGrid,
    GridActionsCellItem,
    GridToolbar,
    GridToolbarContainer,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import {GridRowId} from "@mui/x-data-grid/models/gridRows";
import type {GridColDef} from "@mui/x-data-grid/models/colDef/gridColDef";
import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useAccounts} from "@/src/store/accountStore"
import {AccountType} from "@/src/define/types";

export default function AccountPage() {
    const {accounts, add, remove} = useAccounts()

    const columns: GridColDef[] = [
        {field: "alias"},
        {field: "address"},
        {field: "privateKey"},
        {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (params) => [
                <GridActionsCellItem
                    key={`key-delete-${params.id}`}
                    icon={<DeleteIcon/>}
                    label="Delete"
                    onClick={() => onClickDeleteAccount(params.id)}
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

    const onClickAddAccount = () => {
        add()
    }

    const onClickDeleteAccount = (id: GridRowId) => {
        remove(id.toString())
    }

    const onClickShowDetails = (row: any) => {
        console.log("show details", row)
    }

    function EditToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbar/>
                <Button color="primary" startIcon={<AddIcon/>} onClick={onClickAddAccount}>
                    Add
                </Button>
            </GridToolbarContainer>
        );
    }

    return (
        <DataGrid
            disableRowSelectionOnClick
            rows={accounts.map((item: AccountType) => ({...item, id: item.alias}))}
            columns={columns}
            slots={{
                toolbar: EditToolbar,
            }}
            slotProps={{
                toolbar: {
                    csvOptions: {name: "accounts.csv"}
                }
            }}
        />
    );
}
