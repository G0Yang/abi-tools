'use client'

import * as React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Table, TableBody, TableCell, TableRow } from '@mui/material'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { TableOwnProps } from '@mui/material/Table/Table'
import { TypographyKeySX, TypographyValueSX } from '@/src/components/table/tableOption'

export default function AccountInfoTable(props: { accountInfo: any; tableProps?: TableOwnProps }) {
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

      case 'code':
        if (value?.length > 2) {
          return (
            <TableRow>
              <TableCell>
                <Typography sx={TypographyKeySX}>{name}</Typography>
              </TableCell>
              <TableCell>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>{name}</AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={TypographyValueSX}>{value?.toString()}</Typography>
                  </AccordionDetails>
                </Accordion>
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
        {Object.entries(props?.accountInfo)
          .filter(([, value]) => value !== null && value !== undefined)
          .map(([key, value], id) => (
            <KeyValueRow key={id} name={key} value={value} />
          ))}
      </TableBody>
    </Table>
  )
}
