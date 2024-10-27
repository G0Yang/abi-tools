'use client';

import * as React from 'react';
import {
    DataGrid,
    GridActionsCellItem,
    GridToolbar,
    GridToolbarContainer, useGridApiRef,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import {GridRowId} from "@mui/x-data-grid/models/gridRows";
import type {GridColDef} from "@mui/x-data-grid/models/colDef/gridColDef";
import {Box, Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useAccounts} from "@/src/store/accountStore"
import {AccountType} from "@/src/define/types";
import {useEffect} from 'react';

export default function AccountPage() {
    const {accounts, add, remove, random} = useAccounts()

    const columns: GridColDef[] = [
        {
            field: "alias",
            width: 250,
        },
        {
            field: "address",
            width: 400,
        },
        {
            field: "privateKey",
            width: 580,
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
        console.log("show details", row)
    }

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
            </GridToolbarContainer>
        );
    }

    return (<DataGrid
            disableRowSelectionOnClick
            rows={accounts.map((item: AccountType) => ({...item, id: item.alias}))}
            columns={columns}
            slots={{
                toolbar: EditToolbar,
            }}
            sx={{ display: 'grid', height: "100%", alignContent: "space-between" }}
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
