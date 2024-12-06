import DialogCloseButton from '@/components/DialogCloseButton'
import { Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material'
import { useEffect } from 'react'
import useDeleteWarehouse from '../hooks/useDeleteWarehouse'
import type { WarehouseType } from '@/types/warehouseTypes'

interface DeleteWarehouseDialogProps {
  selectedWarehouse: WarehouseType | null
  setSelectedWarehouse: (warehouse: WarehouseType | null) => void
  open: boolean
  setOpen: (open: boolean) => void
}
export default function DeleteWarehouseDialog({
  selectedWarehouse,
  setSelectedWarehouse,
  open,
  setOpen
}: DeleteWarehouseDialogProps) {
  // Hooks
  const { mutate, isPending, isSuccess } = useDeleteWarehouse()

  // Effects
  useEffect(() => {
    if (isSuccess) {
      handleClose()
    }
  }, [isSuccess])

  // Methods
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedWarehouse) mutate(selectedWarehouse.id)
  }

  function handleClose() {
    setSelectedWarehouse(null)
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
          Are you sure you want to delete this warehouse?
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
            Delete
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
