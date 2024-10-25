import * as React from 'react';
import {IconButton, TextField, Tooltip, Modal, Box} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {useState} from "react";
import {TextFieldProps} from "@mui/material/TextField/TextField";

const modalStyle = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90%",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function SearchTextField(props: Omit<TextFieldProps, 'variant'>) {
    const onSearch = () => {
        if(props?.value && typeof props?.value === "string") {
            if(!props?.value.startsWith("0x")) return
            if(props?.value.length === 42) {
                console.log("search address", props?.value)
            } else if (props?.value.length === 66) {
                console.log("search tx or block", props?.value)
            } else {
                return
            }
        }
    }

    return (<TextField
        {...props}
        label="Tx, BlockHash, Address"
        variant="outlined"
        size="small"
        slotProps={{
            input: {
                endAdornment: (
                    <IconButton type="button" aria-label="search" size="small" onClick={onSearch}>
                        <SearchIcon/>
                    </IconButton>
                ),
                sx: {pr: 0.5},
            },
        }}
        onKeyDown={({key}) => key === "Enter" && onSearch()}
    />)
}

export default function Search() {
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [searchText, setSearchText] = useState<string>("")

    return (
        <React.Fragment>
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <SearchTextField
                        sx={{width: "100%"}}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </Box>
            </Modal>
            <Tooltip title="Search" enterDelay={1000} onClick={() => setModalOpen(true)}>
                <div>
                    <IconButton
                        type="button"
                        aria-label="search"
                        sx={{
                            display: {xs: 'inline', md: 'none'},
                        }}
                    >
                        <SearchIcon/>
                    </IconButton>
                </div>
            </Tooltip>
            <SearchTextField
                sx={{display: {xs: 'none', md: 'inline-block'}, mr: 1}}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
        </React.Fragment>
    );
}