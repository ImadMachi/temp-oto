'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import Form from './Form'
import Instructions from './Instructions'

type ConnectSalesChannelDialogProps = {
  open: boolean
  setOpen: (param: boolean) => void
}
const ConnectSalesChannelDialog = ({ open, setOpen }: ConnectSalesChannelDialogProps) => {
  // States
  const [tabValue, setTabValue] = useState('instructions')

  // Methods
  const handleClose = () => {
    setOpen(false)
    setTabValue('instructions')
  }

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      maxWidth='sm'
      scroll='body'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogTitle variant='h4' className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        Connect Sales Channel
      </DialogTitle>

      <TabContext value={tabValue}>
        <TabList centered aria-label='nav tabs example'>
          <Tab value='instructions' component='span' label='Instructions' onClick={() => setTabValue('instructions')} />
          <Tab value='form' component='span' label='Credentials' onClick={() => setTabValue('form')} />
        </TabList>
        <TabPanel value='instructions'>
          <Instructions handleClose={handleClose} setTabValue={setTabValue} />
        </TabPanel>
        <TabPanel value='form'>
          <Form handleClose={handleClose} />
        </TabPanel>
      </TabContext>
    </Dialog>
  )
}

export default ConnectSalesChannelDialog
