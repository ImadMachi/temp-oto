import CustomTextField from '@/@core/components/mui/TextField'
import { Button, DialogActions, DialogContent, Grid, IconButton, MenuItem, Typography } from '@mui/material'
import type { OrderDataType } from '.'
import AppReactDatepicker from '@/components/AppReactDatePicker'
import CustomAutocomplete from '@/@core/components/mui/Autocomplete'
import ProductTable from './ProductTable'
import BoxTable from './BoxTable'

const paymentMethods = ['Paid', 'Cash on delivery']

const currencies = ['SAR', 'USD', 'EUR']

const wareHouses = ['Riyadh', 'Jeddah', 'Medina', 'Dammam']

interface OrderDetailsTabProps {
  orderData: OrderDataType
  setOrderData: React.Dispatch<React.SetStateAction<OrderDataType>>
  handleClose: () => void
}
export default function OrderDetailsTab({ orderData, setOrderData, handleClose }: OrderDetailsTabProps) {
  const generateOrderNumber = () => {
    const randomNum = Math.floor(Math.random() * 1000)
    setOrderData({ ...orderData, orderNumber: `O-${randomNum}` })
  }
  return (
    <>
      <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
        <Typography variant='h5' color='secondary' className='mb-3'>
          Order Details
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6} className='flex items-end'>
            <CustomTextField
              fullWidth
              label='Order Number'
              placeholder='O-001'
              value={orderData.orderNumber}
              onChange={e => setOrderData({ ...orderData, orderNumber: e.target.value })}
            />
            <IconButton className='mx-1' title='generate' onClick={generateOrderNumber}>
              <i className='tabler-refresh w-6 h-6 '></i>
            </IconButton>
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppReactDatepicker
              showTimeSelect
              timeFormat='HH:mm'
              timeIntervals={15}
              selected={orderData.orderDate}
              id='date-time-picker'
              dateFormat='dd/MM/yyyy h:mm aa'
              onChange={(date: Date | null) => setOrderData({ ...orderData, orderDate: date })}
              customInput={<CustomTextField label='Order Date' fullWidth />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              select
              fullWidth
              label='Payment Method'
              value={orderData.paymentMethod}
              onChange={e => setOrderData({ ...orderData, paymentMethod: e.target.value as string })}
            >
              {paymentMethods.map((paymentMethod, index) => (
                <MenuItem key={index} value={paymentMethod}>
                  {paymentMethod}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>
          <Grid item xs={12} sm={6} className='flex items-end'>
            <CustomTextField
              fullWidth
              label='Order Grand Total'
              placeholder='Ex: 100.00'
              type='number'
              value={orderData.orderGrandTotal}
              onChange={e => setOrderData({ ...orderData, orderGrandTotal: e.target.value as unknown as number })}
            />
            <CustomTextField
              select
              className='min-w-20 ml-1'
              value={orderData.currency}
              onChange={e => setOrderData({ ...orderData, currency: e.target.value as string })}
            >
              {currencies.map((currency, index) => (
                <MenuItem key={index} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              fullWidth
              options={wareHouses}
              id='warehouse-autocomplete-custom'
              getOptionLabel={option => option || ''}
              renderInput={params => <CustomTextField placeholder='Choose Warehouse' {...params} label='Warehouse' />}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h5' color='secondary'>
              Products Details
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              label='Product Description'
              rows={2}
              multiline
              placeholder='Ex: Name, Size, Color, ...'
              onChange={e => setOrderData({ ...orderData, lastName: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <ProductTable orderData={orderData} setOrderData={setOrderData} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h5' color='secondary'>
              Boxes Details
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <BoxTable orderData={orderData} setOrderData={setOrderData} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
        <Button variant='contained' endIcon={<i className='tabler-chevron-right' />}>
          Continue
        </Button>
        <Button variant='tonal' color='secondary' type='reset' onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </>
  )
}
