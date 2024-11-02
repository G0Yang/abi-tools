'use client'

import * as React from 'react'
import { Grid2 } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { JsonRpcProvider } from 'ethers'
import { useRpcUrlState } from '@/src/define/useLocalStorageState'

export default function SearchPage() {
  const SearchParams = useSearchParams()
  const [rpcUrl, setRpcUrl] = useRpcUrlState()

  useEffect(() => {
    const query = {
      hash: SearchParams.get('hash'),
      url: SearchParams.get('url')
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
  }, [SearchParams])

  const onSearch = async (searchText: string, url: string) => {
    if (!searchText.startsWith('0x')) return
    try {
      const provider = new JsonRpcProvider(url)
      if (searchText.length === 42) {
        console.log('search address', searchText)
        const [code, balance, nonce, lookup] = (
          await Promise.allSettled([
            provider.getCode(searchText),
            provider.getBalance(searchText),
            provider.getTransactionCount(searchText),
            provider.lookupAddress(searchText)
          ])
        ).map(item => (item.status === 'fulfilled' ? item.value : undefined))
        console.log({ code, balance, nonce, lookup })
      } else if (searchText.length === 66) {
        console.log('search tx or block', searchText)
        const [block, tx, receipt, result] = (
          await Promise.allSettled([
            provider.getBlock(searchText),
            provider.getTransaction(searchText),
            provider.getTransactionReceipt(searchText),
            provider.getTransactionResult(searchText)
          ])
        ).map(item => (item.status === 'fulfilled' ? item.value : undefined))
        console.log({ block, tx, receipt, result })
      } else {
        return
      }
    } catch (e) {}
  }

  return <Grid2 sx={{ p: 1 }}></Grid2>
}
