'use client';

import * as React from 'react';
import {Box, Button, Grid2, Toolbar} from "@mui/material";
import {useLocalStorageState} from "@toolpad/core";
import {ContractType} from "@/src/define/types";
import ContractPenal from "@/src/components/contractPenal";
import {v4} from "uuid";

export default function EthersPage() {
    const [contracts, setContracts] = useLocalStorageState<ContractType[]>(
        'at-contracts',
        [],
        {codec: JSON},
    );

    if (!contracts) return <></>

    // todo: horizontal scroll
    return (
        <Grid2 container direction={"column"} width={"100%"}>
            <Grid2 container direction={"row"} width={"100%"}>
                <Toolbar>
                    <Button onClick={() => setContracts([...contracts, {} as ContractType])}>add</Button>
                </Toolbar>
            </Grid2>
            <Grid2
                container
                sx={{
                    display: "flex",
                    flexWrap: "nowrap",
                    overflowX: "scroll",
                    overflowY: "hidden"
                }}
            >
                {contracts.map((cont, id) => <ContractPenal key={v4()} {...cont} id={id}/>)}
            </Grid2>
        </Grid2>
    );
}
