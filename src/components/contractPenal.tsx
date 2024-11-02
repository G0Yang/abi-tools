'use client'

import * as React from 'react'
import { Button, Grid2, TextField } from '@mui/material'
import { ContractType } from '@/src/define/types'
import { useEffect, useState } from 'react'
import ContractSelect from '@/src/components/contractSelect'
import SignerSelect from '@/src/components/signerSelect'
import { contractPenalWidth } from '@/src/theme'
import { useABI } from '@/src/store/abiStore'
import FunctionAccordion from '@/src/components/functionAccordion'
import { useContractState } from '@/src/define/useLocalStorageState'

export default function ContractPenal({ contract, id }: { contract: ContractType; id: number }) {
  const [contracts, setContracts] = useContractState()
  const { contractInfo } = useABI()

  const [alias, setAlias] = useState(contract?.alias || '')
  const [target, setTarget] = useState(contract?.target || '')
  const [signer, setSigner] = useState(contract?.signer || '')
  const [contractName, setContractName] = useState(contract?.contractName || '')
  const [functions, setFunctions] = useState<any[]>([])

  useEffect(() => {
    if (!contracts) return
    if (contracts[id].alias !== alias) contracts[id].alias = alias
    if (contracts[id].target !== target) contracts[id].target = target
    if (contracts[id].signer !== signer) contracts[id].signer = signer
    if (contracts[id].contractName !== contractName) contracts[id].contractName = contractName
    setContracts(contracts)
    if (!contractName || contractName === '' || !contractInfo[contractName]) {
      setFunctions([])

      return
    }
    const _functions = contractInfo[contractName].abi?.filter(({ type }) => type === 'function')
    setFunctions(_functions)
  }, [alias, target, signer, contractName])

  if (!contracts) return <></>

  return (
    <Grid2 sx={{ mx: 0.4, minWidth: contractPenalWidth, width: contractPenalWidth }}>
      <Button onClick={() => setContracts(contracts?.filter((_, _id) => id !== _id))}>remove</Button>
      <TextField fullWidth label={'alias'} value={alias} onChange={e => setAlias(e.target.value)} sx={{ mt: 1 }} />
      <TextField fullWidth label={'target'} value={target} onChange={e => setTarget(e.target.value)} sx={{ mt: 1 }} />
      <SignerSelect
        fullWidth
        value={signer}
        onChange={(e: any) => setSigner(e.target.value)}
        sx={{ mt: 1 }}
        variant={'outlined'}
      />
      <ContractSelect value={contractName} onChange={(_: any, e: any) => setContractName(e)} sx={{ mt: 1 }} />
      {functions?.map((item, id) => (
        <FunctionAccordion key={`${contractName}-${id}-${id}`} fragment={item} target={target} signer={signer} />
      ))}
    </Grid2>
  )
}
