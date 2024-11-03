'use client'

import * as React from 'react'
import { Table, TableBody, TableCell, TableRow } from '@mui/material'
import Typography from '@mui/material/Typography'
import { ErrorFragment, ParamType, Result } from 'ethers'
import { TableOwnProps } from '@mui/material/Table/Table'

export default function ErrorFragmentTable(props: {
  fragment: ErrorFragment
  values?: Result
  tableProps?: TableOwnProps
}) {
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

      case 'inputs':
        return (
          <TableRow>
            <TableCell>{name}</TableCell>
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
