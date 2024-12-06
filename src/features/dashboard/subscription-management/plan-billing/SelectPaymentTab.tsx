import { Button, DialogActions, DialogContent, Input, Typography } from '@mui/material'
import classNames from 'classnames'
import Image from 'next/image'
import { useState } from 'react'

interface SelectPaymentTabProps {
  setTabValue: (value: string) => void
  handleClose: () => void
}
export default function SelectPaymentTab({ setTabValue, handleClose }: SelectPaymentTabProps) {
  const [selectedPayment, setSelectedPayment] = useState<'visa' | 'mastercard'>('visa')
  return (
    <>
      <DialogContent className='overflow-visible pbs-0 sm:pli-16 max-w-md mx-auto'>
        <Typography variant='h5' className='text-center my-4'>
          Select Credit Card
        </Typography>
        <div
          onClick={() => setSelectedPayment('visa')}
          className={classNames(
            'flex justify-between items-center shadow bg-gray-100 rounded p-4 mb-3 cursor-pointer',
            {
              'border border-primary bg-primaryLight': selectedPayment === 'visa'
            }
          )}
        >
          <div>
            <Image unoptimized src='/images/logos/visa.png' alt='visa' width={60} height={30} />
          </div>
          <Typography variant='body1' color='text.secondary'>
            **** **** **** 2154
          </Typography>
        </div>
        <div
          onClick={() => setSelectedPayment('mastercard')}
          className={classNames(
            'flex justify-between items-center shadow bg-gray-100 rounded p-4 mb-3 cursor-pointer',
            {
              'border border-primary bg-primaryLight': selectedPayment === 'mastercard'
            }
          )}
        >
          <div>
            <Image unoptimized src='/images/logos/master-card.png' alt='mastercard' width={60} height={30} />
          </div>
          <Typography variant='body1' color='text.secondary'>
            **** **** **** 4896
          </Typography>
        </div>
      </DialogContent>
      <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16 mt-4'>
        <Button variant='tonal' color='secondary' type='reset' onClick={handleClose}>
          Cancel
        </Button>
        <Button
          onClick={() => setTabValue('confirm-plan')}
          variant='outlined'
          startIcon={<i className='tabler-chevron-left' />}
        >
          Previous
        </Button>
        <Button
          onClick={() => setTabValue('select-completed')}
          variant='contained'
          endIcon={<i className='tabler-chevron-right' />}
        >
          Continue
        </Button>
      </DialogActions>
    </>
  )
}
