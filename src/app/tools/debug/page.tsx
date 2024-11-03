'use client'

import * as React from 'react'
import { Box, Grid2, Tab } from '@mui/material'
import { useEffect, useState } from 'react'
import { SearchTextField } from '@/src/components/core/toolbarActions/search'
import { useABI } from '@/src/store/abiStore'
import { ErrorFragment, EventFragment, Interface, Result } from 'ethers'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { FunctionFragment } from 'ethers'
import FunctionFragmentTable from '@/src/components/table/FuntionFragmentTable'
import EventFragmentTable from '@/src/components/table/EventFragmentTable'
import ErrorFragmentTable from '@/src/components/table/ErrorFragmentTable'

export default function DebugPage() {
  const { contractInfo } = useABI()

  const [tabSelector, setTabSelector] = useState<string>('0')
  const [encodeString, setEncodeString] = useState<string>('')

  const [inf, setInf] = useState<Interface>()

  const [decodeFunctionFragment, setDecodeFunctionFragment] = useState<FunctionFragment>()
  const [decodeFunctionInputs, setDecodeFunctionInputs] = useState<Result>()

  const [decodeEventFragment, setDecodeEventFragment] = useState<EventFragment>()
  const [decodeEventInputs, setDecodeEventInputs] = useState<Result>()

  const [decodeErrorFragment, setDecodeErrorFragment] = useState<ErrorFragment>()
  const [decodeErrorInputs, setDecodeErrorInputs] = useState<Result>()

  useEffect(() => {
    if (!contractInfo) return
    const allABIs = Object.values(contractInfo)
      .map(({ abi }) => abi)
      .flat()
      .filter(frag => frag.type !== 'fallback')
    setInf(new Interface(allABIs))
  }, [contractInfo])

  const onClickDebug = () => {
    setTabSelector('0')
    if (!contractInfo || !inf || !encodeString.startsWith('0x')) return

    if (encodeString.length >= 10) {
      // test function data : 0xa9059cbb0000000000000000000000007f899e0b9a80530f4bdea503fafa58f554630401000000000000000000000000000000000000000000000000000000000015fe86
      // test function data : 0xa9059cbb
      const isFunction = inf.getFunction(encodeString.slice(0, 10))
      if (isFunction) {
        setTabSelector('1')
        setDecodeFunctionFragment(isFunction)
        try {
          setDecodeFunctionInputs(inf.decodeFunctionData(isFunction, encodeString))
        } catch (_) {
          setDecodeFunctionInputs(undefined)
        }
      } else setDecodeFunctionFragment(undefined)

      // test event data : 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
      const isEvent = inf.getEvent(encodeString.slice(0, 66))
      if (isEvent) {
        setTabSelector('2')
        setDecodeEventFragment(isEvent)
        try {
          setDecodeEventInputs(inf.decodeEventLog(isEvent, encodeString))
        } catch (_) {
          setDecodeEventInputs(undefined)
        }
      } else {
        setDecodeEventFragment(undefined)
      }

      const isError = inf.getError(encodeString.slice(0, 66))
      if (isError) {
        setTabSelector('3')
        setDecodeErrorFragment(isError)
        try {
          setDecodeErrorInputs(inf.decodeErrorResult(isError, encodeString))
        } catch (_) {
          setDecodeErrorInputs(undefined)
        }
      } else {
        setDecodeErrorFragment(undefined)
      }
    }
  }

  return (
    <Grid2 sx={{ p: 1 }} container direction={'row'} display={'grid'}>
      <SearchTextField
        multiline
        label={'Encoded String'}
        value={encodeString}
        onChange={e => setEncodeString(e.target.value.trimEnd())}
        onKeyDown={({ key }) => key === 'Enter' && onClickDebug()}
        onSlotButtonClick={onClickDebug}
        sx={{ width: '100%' }}
      />

      <TabContext value={tabSelector}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={(_, e) => setTabSelector(e.toString())}>
            <Tab label='Home' value={'0'} />
            <Tab label='Function' value={'1'} disabled={!decodeFunctionFragment} />
            <Tab label='Event' value={'2'} disabled={!decodeEventFragment} />
            <Tab label='Error' value={'3'} disabled={!decodeErrorFragment} />
          </TabList>
        </Box>

        <Grid2 container width={'100%'}>
          <TabPanel value={'0'}>home</TabPanel>
          <TabPanel value={'1'}>
            {decodeFunctionFragment && (
              <FunctionFragmentTable
                tableProps={{ size: 'small' }}
                fragment={decodeFunctionFragment}
                values={decodeFunctionInputs}
              />
            )}
          </TabPanel>
          <TabPanel value={'2'}>
            {decodeEventFragment && (
              <EventFragmentTable
                tableProps={{ size: 'small' }}
                fragment={decodeEventFragment}
                values={decodeEventInputs}
              />
            )}
          </TabPanel>
          <TabPanel value={'3'}>
            {decodeErrorFragment && (
              <ErrorFragmentTable
                tableProps={{ size: 'small' }}
                fragment={decodeErrorFragment}
                values={decodeErrorInputs}
              />
            )}
          </TabPanel>
        </Grid2>
      </TabContext>
    </Grid2>
  )
}
