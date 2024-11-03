'use client'

import * as React from 'react'
import { Table, TableBody, TableCell, TableRow } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Block } from 'ethers'
import { TableOwnProps } from '@mui/material/Table/Table'
import { TypographyKeySX, TypographyValueSX } from '@/src/components/table/tableOption'

export default function BlockTable(props: { block: Block; tableProps?: TableOwnProps }) {
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

      case 'signature':
        return (
          <TableRow>
            <TableCell>
              <Typography sx={TypographyKeySX}>{name}</Typography>
            </TableCell>
            <TableCell>
              <Typography sx={TypographyValueSX}>{JSON.stringify(value.toJSON(), null, 4)}</Typography>
            </TableCell>
          </TableRow>
        )

      case 'transactions':
        return (
          <TableRow>
            <TableCell>
              <Typography sx={TypographyKeySX}>{name}</Typography>
            </TableCell>
            <TableCell>
              {
                <TableRow>
                  <TableCell>
                    <Table {...props?.tableProps}>
                      <TableBody>
                        {value?.map((tx: string, idx: number) => (
                          <TableRow key={idx}>
                            <TableCell>{idx}</TableCell>
                            <TableCell>
                              <Typography sx={TypographyValueSX}>{tx}</Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableCell>
                </TableRow>
              }
            </TableCell>
          </TableRow>
        )
    }
  }

  return (
    <Table {...props?.tableProps}>
      <TableBody>
        {Object.entries(props?.block)
          .filter(([, value]) => value !== null && value !== undefined)
          .filter(([key]) => key !== 'provider' && key !== '_type')
          .map(([key, value], id) => (
            <KeyValueRow key={id} name={key} value={value} />
          ))}
      </TableBody>
    </Table>
  )
}
