'use client'

import * as React from 'react'
import { Table, TableBody, TableCell, TableRow } from '@mui/material'
import Typography from '@mui/material/Typography'
import { EventFragment, Result, ParamType } from 'ethers'
import { TableOwnProps } from '@mui/material/Table/Table'
import { TypographyKeySX, TypographyValueSX } from '@/src/components/table/tableOption'

export default function EventFragmentTable(props: {
  fragment: EventFragment
  values?: Result
  tableProps?: TableOwnProps
}) {
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

      case 'inputs':
        return (
          <TableRow>
            <TableCell>
              <Typography sx={TypographyKeySX}>{name}</Typography>
            </TableCell>
            <TableCell>
              <Table {...props?.tableProps}>
                <TableBody>
                  {value?.map((input: ParamType, iId: number) => (
                    <TableRow key={iId}>
                      <TableCell>{iId}</TableCell>
                      {Object.entries(input)
                        .filter(([, value]) => value !== null && value !== undefined)
                        .map(([key, value], fId) => (
                          <KeyValueRow key={fId} name={key} value={value} />
                        ))}
                    </TableRow>
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
        {Object.entries(props?.fragment)
          .filter(([, value]) => value !== null && value !== undefined)
          .map(([key, value], id) => (
            <KeyValueRow key={id} name={key} value={value} />
          ))}
      </TableBody>
    </Table>
  )
}
