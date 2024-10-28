'use client';

import * as React from 'react';
import {Box, MenuItem, Select, Typography} from "@mui/material";
import {useLocalStorageState} from "@toolpad/core";
import {AccountType} from "@/src/define/types";
import {SelectProps} from "@mui/material/Select/Select";

export default function SignerSelect(props: SelectProps<any>) {
    const [accounts] = useLocalStorageState<AccountType[]>('at-accounts', [], {codec: JSON});

    if (!accounts) return <></>

    return (<Select
            {...props}
            label="Select Signer"
        >
            <MenuItem value={""}>
                None
            </MenuItem>)
            {accounts.map(({address}, key) =>
                <MenuItem key={key} value={address}>
                    {address}
                </MenuItem>)}
        </Select>
    );
}
