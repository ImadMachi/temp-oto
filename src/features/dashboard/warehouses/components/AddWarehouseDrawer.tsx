// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import useCreateWarehouse from '../hooks/useCreateWarehouse'
import { Grid } from '@mui/material'
import MapSelection from './MapSelection'
import type { WarehouseType } from '@/types/warehouseTypes'

const Schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  country: Yup.string().required('Country is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  address: Yup.string().required('Address is required'),
  zip_code: Yup.string().required('Zip code is required'),
  latitude: Yup.string().required('Latitude is required'),
  longitude: Yup.string().required('Longitude is required'),
  phone: Yup.string().required('Phone is required')
})

export type WarehouseSchemaType = Yup.InferType<typeof Schema>

const initialData: WarehouseSchemaType = {
  name: '',
  phone: '',
  country: '',
  state: '',
  city: '',
  address: '',
  zip_code: '',
  latitude: '',
  longitude: ''
}

type AddWarehouseDrawerProps = {
  open: boolean
  setOpen: (open: boolean) => void
}
const AddWarehouseDrawer = (props: AddWarehouseDrawerProps) => {
  // Props
  const { open, setOpen } = props

  // Hooks
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<WarehouseSchemaType>({
    resolver: yupResolver(Schema),
    defaultValues: initialData
  })
  const { mutate, isPending, isSuccess } = useCreateWarehouse()

  // Effects
  useEffect(() => {
    if (isSuccess) {
      handleClose()
    }
  }, [isSuccess])

  // Methods
  const onSubmit = (data: WarehouseSchemaType) => {
    const { latitude, longitude, ...rest } = data
    const location = `${latitude},${longitude}`

    const payload = {
      ...rest,
      location
    }
    mutate(payload)
  }

  function handleClose() {
    setOpen(false)
    reset(initialData)
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 250, sm: 300, md: 450, lg: 500 } } }}
    >
      <div className='flex items-center justify-between plb-5 pli-6'>
        <Typography variant='h5'>Add New Warehouse</Typography>
        <IconButton size='small' onClick={handleClose}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit(data => onSubmit(data))} className='p-4'>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Name'
                    placeholder='Enter warehouse name'
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name='phone'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Phone'
                    placeholder='Enter phone'
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Typography variant='h5' color='secondary' className='mt-3'>
            Location Address
          </Typography>

          <MapSelection setValue={setValue} />
          {(!!errors.latitude || !!errors.longitude) && (
            <p className='text-red-500 my-3 text-sm'>Please select a location on the map</p>
          )}

          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <Controller
                name='country'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Country'
                    placeholder='Enter country'
                    error={!!errors.country}
                    helperText={errors.country?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name='state'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='State'
                    placeholder='Enter state'
                    error={!!errors.state}
                    helperText={errors.state?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name='city'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='City'
                    placeholder='Enter city'
                    error={!!errors.city}
                    helperText={errors.city?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name='zip_code'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Zip Code'
                    placeholder='Enter zip code'
                    error={!!errors.zip_code}
                    helperText={errors.zip_code?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='address'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Address Line'
                    placeholder='Enter address line'
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                )}
              />
            </Grid>
          </Grid>

          <div className='flex items-center gap-4 mt-6'>
            <Button
              variant='contained'
              type='submit'
              endIcon={isPending && <i className='tabler-loader animate-spin ' />}
            >
              Submit
            </Button>
            <Button variant='tonal' color='error' type='reset' onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddWarehouseDrawer
