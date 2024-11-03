'use client'

import * as React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Table, TableBody, TableCell, TableRow } from '@mui/material'
import { TransactionReceipt } from 'ethers'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export default function TransactionReceiptTable(props: { receipt: TransactionReceipt }) {
  if (!props) return <></>

  const KeyValueRow = ({ name, value }: { name: string; value: any }) => {
    switch (name) {
      default:
        return (
          <TableRow>
            <TableCell>{name}</TableCell>
            <TableCell>
              <Typography sx={{ wordBreak: 'break-word' }}>{value?.toString()}</Typography>
            </TableCell>
          </TableRow>
        )
    }
  }

  return (
    <Table size={'small'}>
      <TableBody>
        {Object.entries(props?.receipt)
          .filter(([, value]) => value !== null && value !== undefined)
          .filter(([key]) => key !== 'provider')
          .map(([key, value], id) => (
            <KeyValueRow key={id} name={key} value={value} />
          ))}

        {props?.receipt?.logs && (
          <TableRow>
            <TableCell>logs</TableCell>
            <TableCell>
              {props?.receipt?.logs?.map((log, idx) => (
                <Accordion key={idx}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>log {idx}</AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ wordBreak: 'break-word' }}>{JSON.stringify(log, null, 4)}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
