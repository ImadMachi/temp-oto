import DialogCloseButton from '@/components/DialogCloseButton'
import { Button, Dialog, DialogActions, DialogTitle, Typography } from '@mui/material'

import useDeleteWarehouses from '../hooks/useDeleteWarehouses'
import { useEffect } from 'react'
import type { WarehouseStatusType, WarehouseType } from '@/types/warehouseTypes'
import useUpdateWarehouseStatuses from '../hooks/useUpdateWarehouseStatuses'

interface UpdateWarehouseStatusesDialogProps {
  status: WarehouseStatusType
  selectedWarehouses: WarehouseType[]
  open: boolean
  setOpen: (open: boolean) => void
}
export default function UpdateWarehouseStatusesDialog({
  status,
  selectedWarehouses,
  open,
  setOpen
}: UpdateWarehouseStatusesDialogProps) {
  // Hooks
  const { mutate, isPending, isSuccess } = useUpdateWarehouseStatuses()

  // Effects
  useEffect(() => {
    if (isSuccess) {
      handleClose()
    }
  }, [isSuccess])

  // Methods
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate({ ids: selectedWarehouses.map(warehouse => warehouse.id), data: { status } })
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
        Confirm {status == 'active' ? 'activate' : 'suspend'}
        <Typography component='span' variant='body2' className='flex flex-col text-center'>
          Are you sure you want to {status == 'active' ? 'activate' : 'suspend'} all selected warehouses?
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
            color={status == 'active' ? 'success' : 'warning'}
            endIcon={isPending && <i className='tabler-loader animate-spin ' />}
          >
            {status == 'active' ? 'Activate' : 'Suspend'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
