import DialogCloseButton from '@/components/DialogCloseButton'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Icon,
  MenuItem,
  Typography
} from '@mui/material'
import useDeleteUser from '../hooks/useDeleteUser'
import * as Yup from 'yup'
import type { UserType } from '@/types/userTypes'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import CustomTextField from '@/@core/components/mui/TextField'
import { ROLES } from '../utils/constants'
import { userRoleObj } from '../utils/helpers'
import useEditUser from '../hooks/useEditUser'

const registerSchema = Yup.object().shape({
  full_name: Yup.string().required('Full name is required'),
  groups: Yup.array()
    .of(Yup.number().typeError('Group ID must be a number').required())
    .required('At least one group must be selected')
    .min(1, 'At least one group must be selected')
})

type SchemaType = Yup.InferType<typeof registerSchema>

const initialData: SchemaType = {
  full_name: '',
  groups: []
}

interface EditUserDialogProps {
  selectedUser: UserType
  setSelectedUser: (user: UserType | null) => void
  open: boolean
  setOpen: (open: boolean) => void
}
export default function EditUserDialog({ selectedUser, setSelectedUser, open, setOpen }: EditUserDialogProps) {
  // Hooks
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm<SchemaType>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      full_name: selectedUser.full_name,
      groups: selectedUser.groups.map(group => group.id)
    }
  })
  const { mutate, isPending, isSuccess } = useEditUser()

  // Effects
  useEffect(() => {
    if (isSuccess) {
      handleClose()
    }
  }, [isSuccess])

  // Methods
  const onSubmit = (data: SchemaType) => {
    const payload = {
      id: selectedUser.id,
      data
    }

    mutate(payload)
  }

  function handleClose() {
    setSelectedUser(null)
    setOpen(false)
    reset()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible', width: '100%' } }}
      maxWidth='xs'
    >
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle variant='h4' className='flex flex-col gap-2 text-center p-6 sm:pbs-16 sm:pbe-6 sm:pli-16'>
        Edit User
      </DialogTitle>
      <Divider />
      <DialogContent>
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

          <div className='flex justify-center items-center gap-4'>
            <Button variant='tonal' color='error' type='reset' onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant='contained'
              type='submit'
              endIcon={isPending && <i className='tabler-loader animate-spin ' />}
              disabled={!isDirty}
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
