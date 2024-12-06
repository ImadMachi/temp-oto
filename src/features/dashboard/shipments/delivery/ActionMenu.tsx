import { IconButton, Menu, MenuItem } from '@mui/material'
import { NestedMenuItem } from 'mui-nested-menu'
import { useState, type MouseEvent } from 'react'
import type { ActionMenuProps } from '../common/table-view/OrderListTable'

export default function ActionMenu({ order, className }: ActionMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | Element>(null)
  const open = Boolean(anchorEl)

  const handleClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => setAnchorEl(e.currentTarget)
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <div className='flex items-center'>
      <IconButton size='small' onClick={handleClick} className={className}>
        <i className='tabler-dots-vertical' />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ '& .MuiMenu-paper': { maxWidth: 200, width: '100%' } }}
      >
        <NestedMenuItem
          leftIcon={<i className='tabler-truck'></i>}
          rightIcon={<i className='tabler-empty'></i>}
          label='Create Shipment'
          parentMenuOpen={open}
          sx={{ '&:hover': { backgroundColor: '#f3f3f3' } }}
          delay={500}
          MenuProps={{
            transformOrigin: { vertical: 'top', horizontal: 350 }
          }}
          onClick={handleClose}
        ></NestedMenuItem>
        <NestedMenuItem
          leftIcon={<i className='tabler-settings-2'></i>}
          rightIcon={<i className='tabler-chevron-right'></i>}
          label='Manage'
          parentMenuOpen={open}
          delay={500}
          MenuProps={{
            transformOrigin: { vertical: 'top', horizontal: 389 }
          }}
        >
          <MenuItem onClick={handleClose}>
            <i className='tabler-eye text-[1rem]' /> View Order
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <i className='tabler-reload text-[1rem]' /> Mark As Returned
          </MenuItem>
        </NestedMenuItem>
        <NestedMenuItem
          leftIcon={<i className='tabler-printer'></i>}
          rightIcon={<i className='tabler-chevron-right'></i>}
          label='Print'
          parentMenuOpen={open}
          delay={500}
          MenuProps={{
            transformOrigin: { vertical: 'top', horizontal: 355 }
          }}
        >
          <MenuItem onClick={handleClose}>
            <i className='tabler-list-details text-[1rem]' /> Order Details
          </MenuItem>
        </NestedMenuItem>
        <NestedMenuItem
          leftIcon={<i className='tabler-tools'></i>}
          rightIcon={<i className='tabler-chevron-right'></i>}
          label='Tools'
          parentMenuOpen={open}
          delay={500}
          MenuProps={{
            transformOrigin: { vertical: 'top', horizontal: 405 }
          }}
        >
          <MenuItem onClick={handleClose}>
            <i className='tabler-bubble-text text-[1rem]' /> Add Comment
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <i className='tabler-history text-[1rem]' /> Show Status History
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <i className='tabler-package text-[1rem]' /> Order Items
          </MenuItem>
        </NestedMenuItem>
      </Menu>
    </div>
  )
}
