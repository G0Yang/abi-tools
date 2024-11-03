'use client'

import * as React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Table, TableBody, TableCell, TableRow } from '@mui/material'
import { TransactionResponse } from 'ethers'
import Typography from '@mui/material/Typography'
import { TableOwnProps } from '@mui/material/Table/Table'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export default function TransactionResponseTable(props: { tx: TransactionResponse; tableProps?: TableOwnProps }) {
  if (!props) return <></>

  const KeyValueRow = ({ name, value }: { name: string; value: any }) => {
    switch (name) {
      default:
        return (
          <TableRow>
            <TableCell>
              <Typography sx={{ wordBreak: 'break-word' }}>{name}</Typography>
            </TableCell>
            <TableCell>
              {value?.length > 1000 ? (
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>Details</AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ wordBreak: 'break-word' }}>{value?.toString()}</Typography>
                  </AccordionDetails>
                </Accordion>
              ) : (
                <Typography sx={{ wordBreak: 'break-word' }}>{value?.toString()}</Typography>
              )}
            </TableCell>
          </TableRow>
        )

      case 'signature':
        return (
          <TableRow {...props?.tableProps}>
            <TableCell>
              <Typography sx={{ wordBreak: 'break-word' }}>{name}</Typography>
            </TableCell>
            <TableCell>
              <Table size={'small'}>
                <TableBody>
                  {Object.entries(value.toJSON())
                    .filter(([, value]) => value !== null && value !== undefined)
                    .filter(([key]) => key !== '_type' && key !== 'networkV')
                    .map(([key, value], id) => (
                      <KeyValueRow key={id} name={key} value={value} />
                    ))}
                </TableBody>
              </Table>
            </TableCell>
          </TableRow>
        )
    }
  }

  return (
    <Table {...props?.tableProps}>
      <TableBody>
        {Object.entries(props?.tx)
          .filter(([, value]) => value !== null && value !== undefined)
          .filter(([key]) => key !== 'provider')
          .map(([key, value], id) => (
            <KeyValueRow key={id} name={key} value={value} />
          ))}
      </TableBody>
    </Table>
  )
}
