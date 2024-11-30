'use client'

import * as React from 'react'
import {DataGrid, GridActionsCellItem, GridToolbar, GridToolbarContainer} from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import SecurityIcon from '@mui/icons-material/Security'
import type {GridColDef} from '@mui/x-data-grid/models/colDef/gridColDef'
import {Box, Button, Grid2, Modal, Table, TableBody, TableCell, TableRow} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import {ArtifactType} from '@/src/define/types'
import Dropzone from 'react-dropzone'
import {useABI} from '@/src/store/abiStore'
import Typography from "@mui/material/Typography";
import {useState} from "react";

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

export default function ArtifactsPage() {
    const {contractInfo, add, reset, remove} = useABI()
    const [modalData, setModalData] = useState<any | boolean>(false)

    const columns: GridColDef[] = [
        {
            field: 'contractName',
            minWidth: 200,
            flex: 1
        },
        {
            field: 'abi',
            minWidth: 200,
            flex: 1,
            renderCell: (params) => params.value?.length || 0
        },
        {
            field: 'bytecode',
            minWidth: 200,
            flex: 1,
            renderCell: (params) => {
                const bytecode = params.value.slice(2);
                const sizeInBytes = new Blob([bytecode]).size;

                return bytecode.length > 10 ? `${bytecode.substring(0, 10)}... (${sizeInBytes} bytes)` : `${bytecode} (${sizeInBytes} bytes)`;
            }
        },
        {
            field: 'deployedBytecode',
            minWidth: 200,
            flex: 1,
            renderCell: (params) => {
                const bytecode = params.value.slice(2);
                const sizeInBytes = new Blob([bytecode]).size;

                return bytecode.length > 10 ? `${bytecode.substring(0, 10)}... (${sizeInBytes} bytes)` : `${bytecode} (${sizeInBytes} bytes)`;
            }
        },
        {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: params => [
                <GridActionsCellItem
                    key={`key-delete-${params.id}`}
                    icon={<DeleteIcon/>}
                    label='Delete'
                    onClick={() => remove(params.row.contractName)}
                />,
                <GridActionsCellItem
                    key={`key-details-${params.id}`}
                    icon={<SecurityIcon/>}
                    label='Show Details'
                    onClick={() => setModalData(params.row)}
                    showInMenu
                />
            ]
        }
    ]

    async function onDrop(files: any[]) {
        const encodingFiles = files.map(file => {
            const reader = new FileReader()
            reader.readAsArrayBuffer(file)

            return new Promise(resolve => {
                reader.onload = () => {
                    let fileText: string = ''
                    if (!reader.result) resolve(null)
                    else if (typeof reader.result === 'string') fileText = reader.result
                    else fileText = Buffer.from(reader.result).toString('utf-8')

                    const tmpData = JSON.parse(fileText)
                    if (!tmpData?.contractName || !tmpData?.abi || !tmpData?.bytecode || !tmpData?.deployedBytecode) resolve(null)
                    resolve(tmpData)
                }
            })
        })
        add((await Promise.all(encodingFiles)).filter(a => a) as ArtifactType[])
    }

    function EditToolbar() {
        return (
            <Grid2>
                <Dropzone onDrop={onDrop}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Box sx={{width: '100%', height: 100, border: 1, borderRadius: 2}}>
                                    <p>Drag &#39;n&#39; drop some files here, or click to select files</p>
                                </Box>
                            </div>
                        </section>
                    )}
                </Dropzone>
                <GridToolbarContainer>
                    <GridToolbar/>
                    <Button color='primary' startIcon={<AddIcon/>} onClick={reset}>
                        reset
                    </Button>
                </GridToolbarContainer>
            </Grid2>
        )
    }

    return (
        <>
            <Modal open={!!modalData} onClose={() => setModalData(false)}>
                <Box sx={modalStyle}>
                    <Typography variant="h1">Artifacts Details</Typography>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell align="right">Contract Name</TableCell>
                                <TableCell>{modalData.contractName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">ABI</TableCell>
                                <TableCell>{modalData.abi?.length}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">Bytecode</TableCell>
                                <TableCell><Typography sx={{wordBreak: "break-all"}}>{modalData.bytecode}</Typography></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right">DeployedBytecode</TableCell>
                                <TableCell><Typography sx={{wordBreak: "break-all"}}>{modalData.deployedBytecode}</Typography></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Button
                        sx={{float: 'right'}}
                        onClick={() => setModalData(false)}
                    >
                        Close
                    </Button>
                </Box>
            </Modal>
            <DataGrid
                disableRowSelectionOnClick
                rows={Object.values(contractInfo).map((item, id) => ({...item, id}))}
                columns={columns}
                slots={{toolbar: EditToolbar}}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 25
                        }
                    }
                }}
                sx={{display: 'grid', height: '100%', alignContent: 'start'}}
                slotProps={{
                    toolbar: {csvOptions: {fileName: 'artifacts'}},
                    loadingOverlay: {
                        variant: 'skeleton',
                        noRowsVariant: 'skeleton'
                    }
                }}
            />
        </>
    )
}
