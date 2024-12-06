// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import useCreateUser from '../hooks/useCreateUser'
import { Icon } from '@mui/material'
import { userRoleObj } from '../utils/helpers'
import { useEffect } from 'react'
import { ROLES } from '../utils/constants'

const registerSchema = Yup.object().shape({
  full_name: Yup.string().required('Full name is required'),
  email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  groups: Yup.array()
    .of(Yup.number().typeError('Group ID must be a number').required())
    .required('At least one group must be selected')
    .min(1, 'At least one group must be selected')
})

type SchemaType = Yup.InferType<typeof registerSchema>

const initialData: SchemaType = {
  full_name: '',
  email: '',
  groups: []
}

type AddUserDrawerProps = {
  open: boolean
  setOpen: (open: boolean) => void
}
const AddUserDrawer = (props: AddUserDrawerProps) => {
  // Props
  const { open, setOpen } = props

  // Hooks
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<SchemaType>({
    resolver: yupResolver(registerSchema),
    defaultValues: initialData
  })
  const { mutate, isPending, isSuccess } = useCreateUser()

  // Effects
  useEffect(() => {
    if (isSuccess) {
      handleClose()
    }
  }, [isSuccess])

  // Methods
  const onSubmit = (data: SchemaType) => {
    mutate(data)
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
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between plb-5 pli-6'>
        <Typography variant='h5'>Add New User</Typography>
        <IconButton size='small' onClick={handleClose}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit(data => onSubmit(data))} className='flex flex-col gap-6 p-6'>
          <Controller
            name='full_name'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Full Name'
                placeholder='John Doe'
                error={!!errors.full_name}
                helperText={errors.full_name?.message}
              />
            )}
          />
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Email'
                placeholder='johndoe@gmail.com'
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          <Controller
            name='groups'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange, ...field } }) => (
              <CustomTextField
                select
                SelectProps={{
                  multiple: true,
                  displayEmpty: true,
                  renderValue: selected =>
                    (selected as number[]).length == 0 ? (
                      <span className='text-gray-400'>Select roles...</span>
                    ) : (
                      (selected as number[]).map(val => ROLES[val]).join(', ')
                    )
                }}
                fullWidth
                id='select-roles'
                label='Select Roles'
                value={value || []}
                onChange={e => {
                  onChange(e.target.value)
                }}
                error={!!errors.groups}
                helperText={errors.groups?.message}
                {...field}
              >
                <MenuItem value={1}>
                  <Icon
                    className={`${userRoleObj[1].icon} text-md`}
                    sx={{ color: `var(--mui-palette-${userRoleObj[1].color}-main)` }}
                  />
                  {ROLES[1]}
                </MenuItem>
                <MenuItem value={2}>
                  <Icon
                    className={`${userRoleObj[2].icon} text-md`}
                    sx={{ color: `var(--mui-palette-${userRoleObj[2].color}-main)` }}
                  />
                  {ROLES[2]}
                </MenuItem>
                <MenuItem value={3}>
                  <Icon
                    className={`${userRoleObj[3].icon} text-md`}
                    sx={{ color: `var(--mui-palette-${userRoleObj[3].color}-main)` }}
                  />
                  {ROLES[3]}
                </MenuItem>
                <MenuItem value={4}>
                  <Icon
                    className={`${userRoleObj[4].icon} text-md`}
                    sx={{ color: `var(--mui-palette-${userRoleObj[4].color}-main)` }}
                  />
                  {ROLES[4]}
                </MenuItem>
                <MenuItem value={5}>
                  <Icon
                    className={`${userRoleObj[5].icon} text-md`}
                    sx={{ color: `var(--mui-palette-${userRoleObj[5].color}-main)` }}
                  />
                  {ROLES[5]}
                </MenuItem>
              </CustomTextField>
            )}
          />

          <div className='flex items-center gap-4'>
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

export default AddUserDrawer
