import { IconButton, Menu, MenuItem } from '@mui/material'
import { NestedMenuItem } from 'mui-nested-menu'
import { type MouseEvent, useState } from 'react'
import { type PickupLocationType } from '@/types/pickupLocationTypes'

interface ActionMenuProps {
  pickupLocation: PickupLocationType
  className?: string
}
export default function ActionMenu({ pickupLocation, className }: ActionMenuProps) {
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
        {/* @ts-ignore */}
        <NestedMenuItem
          leftIcon={<i className='tabler-settings-2'></i>}
          rightIcon={<i className='tabler-chevron-right'></i>}
          label='Manage'
          parentMenuOpen={open}
          delay={500}
          MenuProps={
            {
              transformOrigin: { vertical: 'top', horizontal: 390 }
            } as any
          }
        >
          <MenuItem onClick={handleClose}>
            <i className='tabler-edit text-[1rem]' /> Edit Location
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <i className='tabler-eye text-[1rem]' /> View Location
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <i className='tabler-check text-[1rem]' /> Activate Location
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <i className='tabler-x text-[1rem]' /> Deactivate Location
          </MenuItem>
        </NestedMenuItem>
      </Menu>
    </div>
  )
}
