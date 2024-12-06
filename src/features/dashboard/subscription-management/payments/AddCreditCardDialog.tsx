import CustomTextField from '@/@core/components/mui/TextField'
import AppReactDatepicker from '@/components/AppReactDatePicker'
import { DatePicker } from '@mui/lab'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material'
import { useState } from 'react'

interface CreditCardDataType {
  cardNumber: string
  expirationDate: Date | null
  nameOnCard: string
  cvv: string
}

const initialData: CreditCardDataType = {
  cardNumber: '',
  expirationDate: null,
  nameOnCard: '',
  cvv: ''
}

interface AddCreditCardDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}
export default function AddCreditCardDialog({ open, setOpen }: AddCreditCardDialogProps) {
  const [cardData, setCardData] = useState<CreditCardDataType>(initialData)
  const handleClose = () => setOpen(false)
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      maxWidth='xs'
      scroll='body'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogTitle>Add Credit Card</DialogTitle>
      <DialogContent>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={9}>
            <CustomTextField
              fullWidth
              label='Card Number'
              placeholder='Ex: 1234 5678 9012 3456'
              value={cardData.cardNumber}
              onChange={e => setCardData({ ...cardData, cardNumber: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomTextField
              fullWidth
              label='CVV'
              placeholder='Ex: 123'
              value={cardData.cvv}
              onChange={e => setCardData({ ...cardData, cvv: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={9}>
            <CustomTextField
              fullWidth
              label='Name on card'
              placeholder='Ex: John Doe'
              value={cardData.nameOnCard}
              onChange={e => setCardData({ ...cardData, nameOnCard: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <AppReactDatepicker
              showMonthYearPicker
              dateFormat='MM/yy'
              timeIntervals={15}
              selected={cardData.expirationDate}
              id='expiry-date-month-picker'
              placeholderText='MM/yy'
              onChange={(date: Date | null) => setCardData({ ...cardData, expirationDate: date })}
              customInput={<CustomTextField label='Expiry' fullWidth />}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className='justify-center pbs-0  sm:pli-16 mt-4'>
        <Button variant='tonal' color='secondary' type='reset' onClick={handleClose}>
          Cancel
        </Button>

        <Button onClick={() => setOpen(false)} variant='contained'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
