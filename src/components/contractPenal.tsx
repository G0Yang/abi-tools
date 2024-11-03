'use client'

import * as React from 'react'
import { Button, Grid2, TextField } from '@mui/material'
import { ContractType } from '@/src/define/types'
import { useEffect } from 'react'
import ContractSelect from '@/src/components/contractSelect'
import SignerSelect from '@/src/components/signerSelect'
import { contractPenalWidth } from '@/src/theme'
import { useABI } from '@/src/store/abiStore'
import FunctionAccordion from '@/src/components/functionAccordion'
import { useContractState } from '@/src/define/useLocalStorageState'
import { useForm } from 'react-hook-form'
import { JsonFragment } from 'ethers'

export default function ContractPenal({ contract, cId }: { contract: ContractType; cId: number }) {
  const [contracts, setContracts] = useContractState()
  const { contractInfo } = useABI()
  const { register, getValues, setValue, watch } = useForm()

  useEffect(() => {
    if (!contract) return
    Object.entries(contract).map(([key, value]) => setValue(key, value))
  }, [])

  useEffect(() => {
    if (watch && contracts && contractInfo)
      watch((data: any, changed: any) => {
        const _contracts = [...contracts]
        if (changed.name === 'contractName') {
          const contractName = changed?.values?.contractName
          if (contractName?.length > 0 && Object.keys(contractInfo).includes(contractName)) {
            const abi = contractInfo[contractName].abi?.filter(({ type }) => type === 'function')
            _contracts[cId] = { ...data, abi }
            setContracts(_contracts)
          } else {
            _contracts[cId] = { ...contract, ...data }
            setContracts(_contracts)
          }
        } else {
          _contracts[cId] = { ...contract, ...data }
          setContracts(_contracts)
        }
      })
  }, [watch, contractInfo, contract])

  if (!contracts || !contractInfo) return <></>

  return (
    <Grid2 sx={{ mx: 0.4, minWidth: contractPenalWidth, width: contractPenalWidth }}>
      <Button onClick={() => setContracts(contracts?.filter((_, _id) => cId !== _id))}>remove</Button>
      <TextField {...register('alias')} fullWidth label={'alias'} sx={{ mt: 1 }} />
      <TextField {...register('target')} fullWidth label={'target'} sx={{ mt: 1 }} />
      <SignerSelect
        value={getValues('signer') || ''}
        onChange={(e: any) => setValue('signer', e.target.value)}
        fullWidth
        sx={{ mt: 1 }}
      />
      <ContractSelect
        value={getValues('contractName') || ''}
        onChange={(_: any, e: any) => setValue('contractName', e)}
        sx={{ mt: 1 }}
      />
      {contract?.abi?.map((item: JsonFragment, id: number) => (
        <FunctionAccordion
          key={`${cId}-${id}`}
          fragment={item}
          target={getValues('target')}
          signer={getValues('signer')}
        />
      ))}
    </Grid2>
  )
}
