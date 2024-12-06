import CustomTextField from '@/@core/components/mui/TextField'
import { FormControlLabel, Grid, MenuItem, Switch } from '@mui/material'
import { type OrderDataType } from '.'

const countries = ['Saudi Arabia', 'Qatar', 'UAE', 'Kuwait']

const states = ['Riyadh', 'Jeddah', 'Medina', 'Dammam']

const cities = ['Riyadh', 'Jeddah', 'Madinah', 'Dammam']

interface ManualAddressProps {
  orderData: OrderDataType
  setOrderData: React.Dispatch<React.SetStateAction<OrderDataType>>
  isMapSelection?: boolean
}
export default function ManualAddress({ orderData, setOrderData, isMapSelection }: ManualAddressProps) {
  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6} sx={{ mb: 6 }}>
          <CustomTextField
            select
            fullWidth
            label='Country'
            value={orderData.country}
            onChange={e => setOrderData({ ...orderData, country: e.target.value as string })}
          >
            {countries.map((country, index) => (
              <MenuItem key={index} value={country}>
                {country}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>
        {orderData.country === 'Saudi Arabia' && !isMapSelection && (
          <Grid item xs={12} sm={6} className='self-center'>
            <FormControlLabel
              control={
                <Switch
                  defaultChecked={orderData?.useShortAddress}
                  onChange={() => setOrderData({ ...orderData, useShortAddress: !orderData?.useShortAddress })}
                />
              }
              label='Use Short Address Code/National Address?'
            />
          </Grid>
        )}
      </Grid>
      <Grid container spacing={5} sx={{ display: orderData?.useShortAddress ? 'none' : 'flex' }}>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            label='Address Line'
            placeholder='Enter address line'
            value={orderData.addressLine}
            onChange={e => setOrderData({ ...orderData, addressLine: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            select
            fullWidth
            label='State/Region'
            value={orderData.state}
            onChange={e => setOrderData({ ...orderData, state: e.target.value as string })}
          >
            {states.map((state, index) => (
              <MenuItem key={index} value={state}>
                {state}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            select
            fullWidth
            label='City'
            value={orderData.city}
            onChange={e => setOrderData({ ...orderData, city: e.target.value as string })}
          >
            {cities.map((city, index) => (
              <MenuItem key={index} value={city}>
                {city}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            label='Zip Code'
            placeholder='123456'
            value={orderData.zipCode}
            onChange={e => setOrderData({ ...orderData, zipCode: e.target.value })}
          />
        </Grid>
      </Grid>
      <Grid container spacing={5} sx={{ display: orderData?.useShortAddress ? 'flex' : 'none' }}>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            label='Short Address Code/National Address'
            placeholder='Enter Short Address Code/National Address'
            value={orderData.shortAddresCode}
            onChange={e => setOrderData({ ...orderData, shortAddresCode: e.target.value })}
          />
        </Grid>
      </Grid>
    </>
  )
}
