import { IconButton, Menu, MenuItem } from '@mui/material'
import { NestedMenuItem } from 'mui-nested-menu'
import { type MouseEvent, useState } from 'react'
import { type ActionMenuProps } from '../common/table-view/OrderListTable'

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
        sx={{ '& .MuiMenu-paper': { maxWidth: 160, width: '100%' } }}
      >
        <NestedMenuItem
          leftIcon={<i className='tabler-settings-2'></i>}
          rightIcon={<i className='tabler-chevron-right'></i>}
          label='Manage'
          parentMenuOpen={open}
          delay={500}
          MenuProps={{
            transformOrigin: { vertical: 'top', horizontal: 350 }
          }}
        >
          <MenuItem onClick={handleClose}>
            <i className='tabler-eye text-[1rem]' /> View Order
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <i className='tabler-check text-[1rem]' /> Mark As Delivered
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <i className='tabler-stack-pop text-[1rem]' /> Mark As Picked Up
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <i className='tabler-x text-[1rem]' /> Cancel Order
          </MenuItem>
        </NestedMenuItem>
        <NestedMenuItem
          leftIcon={<i className='tabler-printer'></i>}
          rightIcon={<i className='tabler-chevron-right'></i>}
          label='Print'
          parentMenuOpen={open}
          delay={500}
          MenuProps={{
            transformOrigin: { vertical: 'top', horizontal: 430 }
          }}
        >
          <MenuItem onClick={handleClose}>
            <i className='tabler-file text-[1rem]' />
            Shipping Label (AWB)
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <i className='tabler-file text-[1rem]' />
            Return (AWB)
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <i className='tabler-list-details text-[1rem]' />
            Order Details With AWB
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <i className='tabler-checklist text-[1rem]' />
            Delivery Company Pickup List
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <i className='tabler-list-details text-[1rem]' /> Order Details
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <i className='tabler-file-type-pdf text-[1rem]' /> Pick List PDF
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <i className='tabler-file text-[1rem]' /> International Proforma
          </MenuItem>
        </NestedMenuItem>
        <NestedMenuItem
          leftIcon={<i className='tabler-tools'></i>}
          rightIcon={<i className='tabler-chevron-right'></i>}
          label='Tools'
          parentMenuOpen={open}
          delay={500}
          MenuProps={{
            transformOrigin: { vertical: 'top', horizontal: 365 }
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
