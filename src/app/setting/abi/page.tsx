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
import type {GridColDef} from "@mui/x-data-grid/models/colDef/gridColDef";
import {Box, Button, Grid2} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {ContractInfoType} from "@/src/define/types";
import Dropzone from "react-dropzone";
import {useLocalStorageState} from "@toolpad/core";

export default function ABIPage() {
    const [contractInfos, setContractInfos] = useLocalStorageState<{ [key in string]: ContractInfoType }>(
        'at-contractInfos',
        {},
        {codec: JSON},
    );

    if(!contractInfos) return <></>

    const columns: GridColDef[] = [
        {
            field: "contractName",
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
                    onClick={() => {
                        delete contractInfos[params.id]
                        setContractInfos(contractInfos)
                    }}
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

    async function onDrop(files: any[]) {
        const encodingFiles = files.map((file) => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            return new Promise((resolve) => {
                reader.onload = () => {
                    let fileText: string = ""
                    if (!reader.result) resolve(null)
                    else if (typeof reader.result === "string") {
                        fileText = reader.result
                    } else {
                        fileText = Buffer.from(reader.result).toString("utf-8")
                    }
                    const tmpData = JSON.parse(fileText)
                    if (!tmpData?.contractName ||
                        !tmpData?.abi ||
                        !tmpData?.bytecode ||
                        !tmpData?.deployedBytecode
                    ) resolve(null)
                    resolve(tmpData);
                };
            });
        });
        for (const item of (await Promise.all(encodingFiles)).filter(a => a)) {
            if(!contractInfos) continue;
            contractInfos[(item as any).contractName] = item as any
        }
        setContractInfos(contractInfos)
    }


    function EditToolbar() {
        return (
            <Grid2>
                <Dropzone
                    onDrop={onDrop}
                >
                    {({getRootProps, getInputProps}) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Box sx={{width: "100%", height: 100, border: 1, borderRadius: 2}}>
                                    <p>Drag &#39;n&#39; drop some files here, or click to select files</p>
                                </Box>
                            </div>
                        </section>
                    )}
                </Dropzone>
                <GridToolbarContainer>
                    <GridToolbar/>
                    <Button color="primary" startIcon={<AddIcon/>} onClick={() => setContractInfos({})}>
                        reset
                    </Button>
                </GridToolbarContainer>
            </Grid2>
        );
    }

    return (
        <DataGrid
            disableRowSelectionOnClick
            rows={Object.values(contractInfos).map((item, id) => ({...item, id: item.contractName}))}
            columns={columns}
            slots={{
                toolbar: EditToolbar,
            }}
            sx={{display: 'grid', height: "100%", alignContent: "start"}}
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
