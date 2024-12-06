import { Button, Menu, MenuItem } from '@mui/material'
import { type MouseEvent, useState } from 'react'
import DeleteWarehousesDialog from './DeleteWarehousesDialog'
import type { WarehouseStatusType, WarehouseType } from '@/types/warehouseTypes'
import UpdateWarehouseStatusesDialog from './UpdateWarehouseStatusesDialog'

interface BulkActionProps {
  selectedWarehouses: WarehouseType[]
}
export default function BulkAction({ selectedWarehouses }: BulkActionProps) {
  // States
  const [anchorManage, setAnchorManage] = useState<HTMLElement | null>(null)
  const [deleteWarehousesDialogOpen, setDeleteWarehousesDialogOpen] = useState(false)
  const [updateWarehouseStatusesDialogOpen, setUpdateWarehouseStatusesDialogOpen] = useState(false)
  const [warehouseStatus, setWarehouseStatus] = useState<WarehouseStatusType>('active')

  // Methods
  const handleClickManage = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorManage(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorManage(null)
  }

  const handleDeleteWarehouses = () => {
    setDeleteWarehousesDialogOpen(true)
  }

  const handleUpdateWarehouseStatuses = (status: WarehouseStatusType) => {
    setUpdateWarehouseStatusesDialogOpen(true)
    setWarehouseStatus(status)
  }

  return (
    <>
      <div>
        <Button
          fullWidth
          variant='outlined'
          startIcon={<i className='tabler-settings-2' />}
          endIcon={<i className='tabler-chevron-down' />}
          aria-controls='basic-menu'
          aria-haspopup='true'
          onClick={handleClickManage}
        >
          Manage
        </Button>
        <Menu keepMounted id='basic-menu' anchorEl={anchorManage} onClose={handleClose} open={Boolean(anchorManage)}>
          <MenuItem onClick={handleDeleteWarehouses}>
            <i className='tabler-trash' /> Delete warehouses
          </MenuItem>
          <MenuItem onClick={() => handleUpdateWarehouseStatuses('active')}>
            <i className='tabler-play' /> Activate warehouses
          </MenuItem>
          <MenuItem onClick={() => handleUpdateWarehouseStatuses('suspended')}>
            <i className='tabler-pause' /> Suspend warehouses
          </MenuItem>
        </Menu>

        <DeleteWarehousesDialog
          selectedWarehouses={selectedWarehouses}
          open={deleteWarehousesDialogOpen}
          setOpen={setDeleteWarehousesDialogOpen}
        />

        <UpdateWarehouseStatusesDialog
          status={warehouseStatus}
          selectedWarehouses={selectedWarehouses}
          open={updateWarehouseStatusesDialogOpen}
          setOpen={setUpdateWarehouseStatusesDialogOpen}
        />
      </div>
    </>
  )
}
