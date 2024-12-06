'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { Button, DialogActions, DialogContent, Grid } from '@mui/material'
import CustomTextField from '@/@core/components/mui/TextField'

export type PartnerCredentialsType = {
  userId: string
  vendorId: string
  apiKey: string
  secretKey: string
}

const initialData: PartnerCredentialsType = {
  userId: '',
  vendorId: '',
  apiKey: '',
  secretKey: ''
}

type ConnectPartnerDialogProps = {
  open: boolean
  setOpen: (param: boolean) => void
}
const ConnectPartnerDialog = ({ open, setOpen }: ConnectPartnerDialogProps) => {
  // States
  const [credentialsData, setCredentialsData] = useState<PartnerCredentialsType>(initialData)

  const handleClose = () => {
    setOpen(false)
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
        Connect Partner
      </DialogTitle>
      <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='User ID'
                placeholder='Ex: 123-456-789'
                value={credentialsData.userId}
                onChange={e => setCredentialsData({ ...credentialsData, userId: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Vendor ID'
                placeholder='Ex: 123-456-789'
                value={credentialsData.vendorId}
                onChange={e => setCredentialsData({ ...credentialsData, vendorId: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='API Key'
                placeholder='Ex: 123-456-789'
                value={credentialsData.apiKey}
                onChange={e => setCredentialsData({ ...credentialsData, apiKey: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6} className='flex items-end'>
              <CustomTextField
                fullWidth
                label='Secret Key'
                placeholder='Ex: 123-456-789'
                value={credentialsData.secretKey}
                onChange={e => setCredentialsData({ ...credentialsData, secretKey: e.target.value })}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
        <Button variant='contained'>Connect</Button>
        <Button variant='tonal' color='secondary' type='reset' onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConnectPartnerDialog
