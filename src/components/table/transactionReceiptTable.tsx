'use client'

import * as React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Table, TableBody, TableCell, TableRow } from '@mui/material'
import { TransactionReceipt } from 'ethers'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { TableOwnProps } from '@mui/material/Table/Table'
import { TypographyKeySX, TypographyValueSX } from '@/src/components/table/tableOption'

export default function TransactionReceiptTable(props: { receipt: TransactionReceipt; tableProps?: TableOwnProps }) {
  if (!props) return <></>

  const KeyValueRow = ({ name, value }: { name: string; value: any }) => {
    switch (name) {
      default:
        return (
          <TableRow>
            <TableCell>
              <Typography sx={TypographyKeySX}>{name}</Typography>
            </TableCell>
            <TableCell>
              <Typography sx={TypographyValueSX}>{value?.toString()}</Typography>
            </TableCell>
          </TableRow>
        )

      case 'logs':
        return (
          <TableRow>
            <TableCell>
              <Typography sx={TypographyKeySX}>logs</Typography>
            </TableCell>
            <TableCell>
              <Accordion sx={{ width: '100%' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>logs</AccordionSummary>
                <AccordionDetails>
                  {props?.receipt?.logs?.map((log, idx) => (
                    <Accordion key={idx} sx={{ width: '100%' }}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>log {idx}</AccordionSummary>
                      <AccordionDetails>
                        <Table {...props?.tableProps}>
                          <TableBody>
                            {Object.entries(log)
                              .filter(([, value]) => value !== null && value !== undefined)
                              .filter(([key]) => key !== 'provider')
                              .map(([key, value], id) => (
                                <KeyValueRow key={id} name={key} value={value} />
                              ))}
                          </TableBody>
                        </Table>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </AccordionDetails>
              </Accordion>
            </TableCell>
          </TableRow>
        )

      case 'topics':
        if (value?.length > 0) {
          return (
            <TableRow>
              <TableCell>
                <Typography sx={TypographyKeySX}>{name}</Typography>
              </TableCell>
              <TableCell>
                <Table {...props?.tableProps}>
                  <TableBody>
                    {value.map((topic: string, tId: number) => (
                      <TableRow key={tId}>
                        <TableCell>{tId}</TableCell>
                        <TableCell>
                          <Typography sx={TypographyValueSX}>{topic}</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableCell>
            </TableRow>
          )
        } else {
          return (
            <TableRow>
              <TableCell>
                <Typography sx={TypographyKeySX}>{name}</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={TypographyValueSX}>{value?.toString()}</Typography>
              </TableCell>
            </TableRow>
          )
        }
    }
  }

  return (
    <Table {...props?.tableProps}>
      <TableBody>
        {Object.entries(props?.receipt)
          .filter(([, value]) => value !== null && value !== undefined)
          .filter(([key]) => key !== 'provider' && key !== '_type')
          .map(([key, value], id) => (
            <KeyValueRow key={id} name={key} value={value} />
          ))}
      </TableBody>
    </Table>
  )
}
