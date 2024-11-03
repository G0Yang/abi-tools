'use client'

import * as React from 'react'
import { Table, TableBody, TableCell, TableRow } from '@mui/material'
import Typography from '@mui/material/Typography'
import { FunctionFragment, ParamType, Result } from 'ethers'
import { TableOwnProps } from '@mui/material/Table/Table'

export default function FunctionFragmentTable(props: {
  fragment: FunctionFragment
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
              <Typography sx={{ wordBreak: 'break-word' }}>{name}</Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ wordBreak: 'break-word' }}>{value?.toString()}</Typography>
            </TableCell>
          </TableRow>
        )

      case 'inputs':
      case 'outputs':
        return (
          <TableRow>
            <TableCell>
              <Typography sx={{ wordBreak: 'break-word' }}>{name}</Typography>
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
                      {name === 'inputs' && props?.values && props.values.length > iId && (
                        <TableRow>
                          <TableCell>value</TableCell>
                          <TableCell>
                            <Typography sx={{ wordBreak: 'break-word' }}>{props.values[iId].toString()}</Typography>
                          </TableCell>
                        </TableRow>
                      )}
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
