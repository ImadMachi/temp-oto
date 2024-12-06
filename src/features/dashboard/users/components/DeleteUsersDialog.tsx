import DialogCloseButton from '@/components/DialogCloseButton'
import { Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material'

import useDeleteUsers from '../hooks/useDeleteUsers'
import type { UserType } from '@/types/userTypes'
import { useEffect } from 'react'

interface DeleteUsersDialogProps {
  selectedUsers: UserType[]
  open: boolean
  setOpen: (open: boolean) => void
}
export default function DeleteUsersDialog({ selectedUsers, open, setOpen }: DeleteUsersDialogProps) {
  // Hooks
  const { mutate, isPending, isSuccess } = useDeleteUsers()

  // Effects
  useEffect(() => {
    if (isSuccess) {
      handleClose()
    }
  }, [isSuccess])

  // Methods
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate(selectedUsers.map(user => user.id))
  }

  function handleClose() {
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }} maxWidth='xs'>
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle variant='h4' className='flex flex-col gap-2 text-center p-6 sm:pbs-16 sm:pbe-6 sm:pli-16'>
        Confirm delete
        <Typography component='span' variant='body2' className='flex flex-col text-center'>
          Are you sure you want to delete all selected users?
        </Typography>
      </DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogActions className='justify-center pbs-0 p-6 sm:pbe-16 sm:pli-16'>
          <Button variant='tonal' type='reset' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant='contained'
            type='submit'
            color='error'
            endIcon={isPending && <i className='tabler-loader animate-spin ' />}
          >
            Delete All
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
