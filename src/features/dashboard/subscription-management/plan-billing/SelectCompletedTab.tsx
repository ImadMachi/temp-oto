import { Button, DialogActions, DialogContent, Input, Typography } from '@mui/material'
import classNames from 'classnames'
import Image from 'next/image'
import { useState } from 'react'

interface SelectCompletedTabProps {
  setTabValue: (value: string) => void
  handleClose: () => void
}
export default function SelectCompletedTab({ handleClose }: SelectCompletedTabProps) {
  return (
    <>
      <DialogContent className='overflow-visible pbs-0 sm:pli-16 mx-auto text-center pt-4'>
        <Image unoptimized src='/images/icons/checked.png' alt='visa' width={80} height={80} />
        <Typography variant='h5' className='my-2'>
          Your plan has been successfully updated!
        </Typography>
        <Typography variant='body1' className='mb-4'>
          You can manage your subscription anytime from your account settings.
        </Typography>
      </DialogContent>
      <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
        <Button variant='contained' type='reset' onClick={handleClose}>
          Finish
        </Button>
      </DialogActions>
    </>
  )
}
