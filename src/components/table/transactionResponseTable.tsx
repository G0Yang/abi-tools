'use client'

import * as React from 'react'
import { Table, TableBody, TableCell, TableRow } from '@mui/material'
import { TransactionResponse } from 'ethers'
import Typography from '@mui/material/Typography'

export default function TransactionResponseTable(props: { tx: TransactionResponse }) {
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

      case 'signature':
        /*
                {
                 "_type": "signature",
                 "networkV": "16469",
                 "r": "0x07fe4d14c128a6e25a9feb8859751a4100a0566b9aed1ab128727ee4fcac6bcc",
                 "s": "0x62fa207fef4b160e7bd161ca3522f1c569cc70f641da60077eb11241efe72dbc",
                 "v": 27
                 }
                 */
        return (
          <TableRow>
            <TableCell>{name}</TableCell>
            <TableCell>
              <Table size={'small'}>
                <TableBody>
                  {Object.entries(value.toJSON())
                    .filter(([, value]) => value !== null && value !== undefined)
                    .filter(([key]) => key !== '_type')
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
    <Table size={'small'}>
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
