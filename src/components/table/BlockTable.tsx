'use client'

import * as React from 'react'
import { Table, TableBody, TableCell, TableRow } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Block } from 'ethers'

export default function BlockTable(props: { block: Block }) {
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
        return (
          <TableRow>
            <TableCell>{name}</TableCell>
            <TableCell>{JSON.stringify(value.toJSON(), null, 4)}</TableCell>
          </TableRow>
        )
    }
  }

  return (
    <Table size={'small'}>
      <TableBody>
        {Object.entries(props?.block)
          .filter(([, value]) => value !== null && value !== undefined)
          .filter(([key]) => key !== 'provider')
          .map(([key, value], id) => (
            <KeyValueRow key={id} name={key} value={value} />
          ))}

        {props?.block?.transactions && (
          <TableRow>
            <TableCell>logs</TableCell>
            <TableCell>
              <Table size={'small'}>
                <TableBody>
                  {props?.block?.transactions?.map((tx, idx) => (
                    <TableRow key={idx}>
                      <TableCell>idx: {idx}</TableCell>
                      <TableCell>
                        <Typography sx={{ wordBreak: 'break-word' }}>{tx}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
