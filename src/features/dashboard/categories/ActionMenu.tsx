import { IconButton, Menu, MenuItem } from '@mui/material'
import { type MouseEvent, useState } from 'react'
import type { CategoryType } from '@/types/productTypes'

export interface ActionMenuProps {
  category: CategoryType
  className?: string
}
export default function ActionMenu({ category, className }: ActionMenuProps) {
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
        <MenuItem onClick={handleClose}>
          <i className='tabler-edit text-[1rem]' /> Edit Category
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <i className='tabler-eye text-[1rem]' /> View Category
        </MenuItem>
      </Menu>
    </div>
  )
}
