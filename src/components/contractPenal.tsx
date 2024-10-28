'use client';

import * as React from 'react';
import {Accordion, Button, Grid2, TextField} from "@mui/material";
import {ContractType} from "@/src/define/types";
import {useLocalStorageState} from "@toolpad/core";
import {useEffect, useState} from "react";
import ContractSelect from "@/src/components/contractSelect";
import SignerSelect from "@/src/components/signerSelect";
import {contractPenalWidth} from "@/src/theme";
import Typography from "@mui/material/Typography";
import {useABI} from "@/src/store/abiStore";
import FunctionAccordion from "@/src/components/functionAccordion";
import {v4} from "uuid";

export default function ContractPenal(props: ContractType & { id: number }) {
    const [alias, setAlias] = useState(props?.alias || "")
    const [target, setTarget] = useState(props?.target || "")
    const [signer, setSigner] = useState(props?.signer || "")
    const [contractName, setContractName] = useState(props?.contractName || "")
    const [functions, setFunctions] = useState<any[]>([])

    const [contracts, setContracts] = useLocalStorageState<ContractType[]>(
        'at-contracts',
        [],
        {codec: JSON},
    );

    const {contractInfo} = useABI()

    useEffect(() => {
        if (!contracts) return
        contracts[props.id].alias = alias
        setContracts(contracts)
    }, [alias])

    useEffect(() => {
        if (!contracts) return
        contracts[props.id].target = target
        setContracts(contracts)
    }, [target])

    useEffect(() => {
        if (!contracts) return
        contracts[props.id].signer = signer
        setContracts(contracts)
    }, [signer])

    useEffect(() => {
        if (!contracts || !contractInfo) return
        contracts[props.id].contractName = contractName || ""
        setContracts(contracts)
        if(!contractName || contractName === "" || !contractInfo[contractName]) return
        const _functions = contractInfo[contractName].abi?.filter(({type}) => type === "function")
        setFunctions(_functions)
    }, [contractName])

    if (!contracts) return <></>

    return (
        <Grid2 container direction={"column"} sx={{mt: 0.2, mr: 0.5, width: contractPenalWidth}} alignItems={"center"}>
            <Button
                onClick={() => setContracts(contracts?.filter((_, _id) => props.id !== _id))}
            >
                remove
            </Button>
            <TextField
                fullWidth
                label={"alias"}
                value={alias}
                onChange={e => setAlias(e.target.value)}
                sx={{mt: 1}}
            />
            <TextField
                fullWidth
                label={"target"}
                value={target}
                onChange={e => setTarget(e.target.value)}
                sx={{mt: 1}}
            />
            <SignerSelect
                fullWidth
                value={signer}
                onChange={(e: any) => setSigner(e.target.value)}
                sx={{mt: 1, width: contractPenalWidth}}
                variant={"outlined"}
            />
            <ContractSelect
                value={contractName}
                onChange={(_: any, e: any) => setContractName(e)}
                sx={{mt: 1}}
            />
            {functions?.map(item => <FunctionAccordion key={v4()} {...item}>{item.name}</FunctionAccordion>)}
        </Grid2>
    );
}
