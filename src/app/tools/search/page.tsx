'use client'

import * as React from 'react'
import { Grid2, Tab } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Block, JsonRpcProvider, TransactionReceipt, TransactionResponse } from 'ethers'
import { useRpcUrlState } from '@/src/define/useLocalStorageState'
import TransactionReceiptTable from '@/src/components/table/transactionReceiptTable'
import TransactionResponseTable from '@/src/components/table/transactionResponseTable'

import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import BlockTable from '@/src/components/table/BlockTable'
import AccountInfoTable from '@/src/components/table/AccountInfoTable'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [rpcUrl, setRpcUrl] = useRpcUrlState()

  const [txRequest, setTxRequest] = useState<TransactionResponse>()
  const [txReceipt, setTxReceipt] = useState<TransactionReceipt>()
  const [blockResult, setBlockResult] = useState<Block>()
  const [accountInfo, setAccountInfo] = useState<object>()

  const [tabSelector, setTabSelector] = useState<string>('0')

  useEffect(() => {
    const query = {
      hash: searchParams.get('hash'),
      url: searchParams.get('url')
    }

    console.log({ query })

    if (query.hash) {
      if (query.url) {
        onSearch(query.hash, query.url)
        if (rpcUrl !== query.url) setRpcUrl(query.url)
      } else if (rpcUrl) {
        onSearch(query.hash, rpcUrl)
      }
    }
  }, [searchParams])

  const onSearch = async (searchText: string, url: string) => {
    if (!searchText.startsWith('0x')) return
    try {
      const provider = new JsonRpcProvider(url)
      if (searchText.length === 42) {
        const [code, balance, nonce, lookup] = (
          await Promise.allSettled([
            provider.getCode(searchText),
            provider.getBalance(searchText),
            provider.getTransactionCount(searchText),
            provider.lookupAddress(searchText)
          ])
        ).map(item => (item.status === 'fulfilled' ? item.value : undefined))

        setAccountInfo({ address: searchText, balance, nonce, lookup, code })
        setTabSelector('4')
      } else if (searchText.length === 66) {
        const [block, tx, receipt] = await Promise.allSettled([
          provider.getBlock(searchText, true),
          provider.getTransaction(searchText),
          provider.getTransactionReceipt(searchText)
        ])

        if (block.status === 'fulfilled' && block?.value) {
          setTabSelector('3')
          setBlockResult(block.value.toJSON())
        } else setBlockResult(undefined)

        if (tx.status === 'fulfilled' && tx?.value) {
          setTabSelector('1')
          setTxRequest(tx.value)
        } else setTxRequest(undefined)

        if (receipt.status === 'fulfilled' && receipt?.value) {
          setTabSelector('2')
          setTxReceipt(receipt.value.toJSON())
        } else setTxReceipt(undefined)
      }
    } catch (e) {}
  }

  return (
    <Grid2 container direction={'row'} display={'grid'} sx={{ p: 1 }}>
      <TabContext value={tabSelector}>
        <TabList variant='scrollable' onChange={(_, e) => setTabSelector(e.toString())}>
          <Tab label='Home' value={'0'} />
          <Tab label='Tx Response' value={'1'} disabled={!txRequest} />
          <Tab label='Tx Receipt' value={'2'} disabled={!txReceipt} />
          <Tab label='Block Details' value={'3'} disabled={!blockResult} />
          <Tab label='Account Details' value={'4'} disabled={!accountInfo} />
        </TabList>

        <Grid2 container overflow={'scroll'} flexWrap={'nowrap'} direction={'column'}>
          <TabPanel sx={{ p: 0 }} value={'0'}>
            home
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value={'1'}>
            {txRequest && <TransactionResponseTable tx={txRequest} tableProps={{ size: 'small' }} />}
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value={'2'}>
            {txReceipt && <TransactionReceiptTable receipt={txReceipt} tableProps={{ size: 'small' }} />}
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value={'3'}>
            {blockResult && <BlockTable block={blockResult} tableProps={{ size: 'small' }} />}
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value={'4'}>
            {accountInfo && <AccountInfoTable accountInfo={accountInfo} tableProps={{ size: 'small' }} />}
          </TabPanel>
        </Grid2>
      </TabContext>
    </Grid2>
  )
}
