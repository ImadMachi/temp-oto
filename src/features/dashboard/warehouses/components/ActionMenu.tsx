import type { WarehouseType } from '@/types/warehouseTypes'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { useState, type MouseEvent } from 'react'
import useEditWarehouse from '../hooks/useEditWarehouse'
import useUpdateWarehouseStatus from '../hooks/useUpdateWarehouseStatus'

interface ActionMenuProps {
  warehouse: WarehouseType
  setSelectedWarehouse: (warehouse: WarehouseType | null) => void
  setDeleteDialogOpen: (open: boolean) => void
  setEditDialogOpen: (open: boolean) => void
}
const ActionMenu = ({ warehouse, setSelectedWarehouse, setDeleteDialogOpen, setEditDialogOpen }: ActionMenuProps) => {
  // States
  const [anchorEl, setAnchorEl] = useState<null | Element>(null)
  const open = Boolean(anchorEl)

  // Hooks
  const { mutate, isPending } = useUpdateWarehouseStatus()
  // Methods
  const handleClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => setAnchorEl(e.currentTarget)

  const handleDelete = () => {
    setSelectedWarehouse(warehouse)
    setDeleteDialogOpen(true)
    handleClose()
  }

  const handleEdit = () => {
    setSelectedWarehouse(warehouse)
    setEditDialogOpen(true)
    handleClose()
  }

  const handleStatus = () => {
    mutate({ id: warehouse.id, data: { status: warehouse.status == 'active' ? 'suspended' : 'active' } })
    setSelectedWarehouse(null)
    handleClose()
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <div className='flex items-center'>
      <IconButton size='small' onClick={handleClick}>
        <i className='tabler-dots-vertical' />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleEdit}>
          <i className='tabler-edit' /> Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <i className='tabler-trash' /> Delete
        </MenuItem>
        <MenuItem onClick={handleStatus}>
          {warehouse.status == 'active' ? (
            <>{isPending ? <i className='tabler-loading' /> : <i className='tabler-pause' />} Suspend</>
          ) : (
            <>{isPending ? <i className='tabler-loading' /> : <i className='tabler-play' />} Activate</>
          )}
        </MenuItem>
      </Menu>
    </div>
  )
}

export default ActionMenu
