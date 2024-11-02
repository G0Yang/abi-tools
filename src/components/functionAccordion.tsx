'use client'

import * as React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Button, TextField } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Contract, JsonFragment, Wallet } from 'ethers'
import { FunctionFragment } from 'ethers'
import { useAccountsState } from '@/src/define/useLocalStorageState'
import { useProvider } from '@/src/store/provider'
import { useForm } from 'react-hook-form'
import { useNotifications } from '@toolpad/core'

export default function FunctionAccordion({
  fragment,
  target,
  signer
}: {
  fragment: JsonFragment
  target: string
  signer: string
}) {
  const { show } = useNotifications()
  const { register, getValues, setValue } = useForm()
  const [accounts] = useAccountsState()
  const { provider } = useProvider()

  const onClick = async () => {
    try {
      // set account
      const signerInfo = accounts?.find(acc => acc.address === signer)

      // parse input
      const inputsText = Object.entries(getValues())
        .filter(([key]) => key.startsWith('input-'))
        .sort()
        .map(([, value]) => value)

      // function execute
      const frag = FunctionFragment.from(fragment)
      switch (frag.type) {
        case 'function':
          switch (frag.stateMutability) {
            case 'nonpayable':
            case 'payable':
              if (!signerInfo) throw Error('개인키가 없습니다.')
              const sendContract = new Contract(target, [frag], new Wallet(signerInfo.privateKey, provider))
              const tx = await sendContract[frag.name].send(...inputsText)
              console.log({ tx })
              show(`${frag.name} send success on ${tx.hash}`, { severity: 'success', autoHideDuration: 3000 })
              break
            case 'pure':
            case 'view':
            default:
              const callContract = new Contract(target, [frag], provider)
              const result = await callContract[frag.name].staticCallResult(...inputsText)
              show(`${frag.name} call success`, { severity: 'success', autoHideDuration: 3000 })
              for (let i = 0; i < frag.outputs.length; i++) {
                setValue(`output-${i}`, result[i])
              }
              break
          }
          break
        case 'constructor':
          break
        default:
          break
      }
    } catch (e: any) {
      console.error(e)
      show(e.message, { severity: 'error', autoHideDuration: 5000 })
    }
  }

  if (!fragment) return <></>

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ wordBreak: 'break-all' }}>
        {fragment.name}
      </AccordionSummary>
      <AccordionDetails>
        {fragment.inputs?.map((item, idx) => (
          <TextField fullWidth key={idx} label={`${item.type} ${item.name}`} {...register(`input-${idx}`)} />
        ))}
        <Button fullWidth onClick={onClick}>
          {fragment.name}
        </Button>
        {fragment.outputs?.map((item, idx) => (
          <TextField
            disabled
            fullWidth
            defaultValue={' '}
            key={idx}
            label={`${item.type} ${item.name}`}
            variant={'standard'}
            {...register(`output-${idx}`)}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  )
}
