import CustomTextField from '@/@core/components/mui/TextField'
import { FormControlLabel, Grid, MenuItem, Switch } from '@mui/material'
import { type LocationDataType } from '.'

const countries = ['Saudi Arabia', 'Qatar', 'UAE', 'Kuwait']

const states = ['Riyadh', 'Jeddah', 'Medina', 'Dammam']

const cities = ['Riyadh', 'Jeddah', 'Madinah', 'Dammam']

interface ManualAddressProps {
  locationData: LocationDataType
  setLocationData: React.Dispatch<React.SetStateAction<LocationDataType>>
  isMapSelection?: boolean
}
export default function ManualAddress({ locationData, setLocationData, isMapSelection }: ManualAddressProps) {
  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6} sx={{ mb: 6 }}>
          <CustomTextField
            select
            fullWidth
            label='Country'
            value={locationData.country}
            onChange={e => setLocationData({ ...locationData, country: e.target.value as string })}
          >
            {countries.map((country, index) => (
              <MenuItem key={index} value={country}>
                {country}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>
        {locationData.country === 'Saudi Arabia' && !isMapSelection && (
          <Grid item xs={12} sm={6} className='self-center'>
            <FormControlLabel
              control={
                <Switch
                  defaultChecked={locationData?.useShortAddress}
                  onChange={() => setLocationData({ ...locationData, useShortAddress: !locationData?.useShortAddress })}
                />
              }
              label='Use Short Address Code/National Address?'
            />
          </Grid>
        )}
      </Grid>
      <Grid container spacing={5} sx={{ display: locationData?.useShortAddress ? 'none' : 'flex' }}>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            label='Address Line'
            placeholder='Enter address line'
            value={locationData.addressLine}
            onChange={e => setLocationData({ ...locationData, addressLine: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            select
            fullWidth
            label='State/Region'
            value={locationData.state}
            onChange={e => setLocationData({ ...locationData, state: e.target.value as string })}
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
            value={locationData.city}
            onChange={e => setLocationData({ ...locationData, city: e.target.value as string })}
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
            value={locationData.zipCode}
            onChange={e => setLocationData({ ...locationData, zipCode: e.target.value })}
          />
        </Grid>
      </Grid>
      <Grid container spacing={5} sx={{ display: locationData?.useShortAddress ? 'flex' : 'none' }}>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            label='Short Address Code/National Address'
            placeholder='Enter Short Address Code/National Address'
            value={locationData.shortAddresCode}
            onChange={e => setLocationData({ ...locationData, shortAddresCode: e.target.value })}
          />
        </Grid>
      </Grid>
    </>
  )
}
