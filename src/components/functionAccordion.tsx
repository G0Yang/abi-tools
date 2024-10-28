'use client';

import * as React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Autocomplete, TextField} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {contractPenalWidth} from "@/src/theme";

export default function FunctionAccordion(props: any) {

    return (
        <Accordion sx={{width: contractPenalWidth}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{wordBreak: "break-all"}}
            >{props?.name}</AccordionSummary>
            <AccordionDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget.
            </AccordionDetails>
        </Accordion>
    );
}
