import { IconButton, Menu, MenuItem } from '@mui/material'
import { NestedMenuItem } from 'mui-nested-menu'
import { type MouseEvent, useState } from 'react'
import { type ProductListType } from '@/types/productTypes'

export interface ActionMenuProps {
  product: ProductListType
  className?: string
}
export default function ActionMenu({ product, className }: ActionMenuProps) {
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
          leftIcon={<i className='tabler-settings-2'></i>}
          rightIcon={<i className='tabler-chevron-right'></i>}
          label='Manage'
          parentMenuOpen={open}
          delay={500}
          MenuProps={{
            transformOrigin: { vertical: 'top', horizontal: 356 }
          }}
        >
          <MenuItem onClick={handleClose}>
            <i className='tabler-edit text-[1rem]' /> Edit Product
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <i className='tabler-eye text-[1rem]' /> View Product
          </MenuItem>
        </NestedMenuItem>
        <NestedMenuItem
          leftIcon={<i className='tabler-tools'></i>}
          rightIcon={<i className='tabler-chevron-right'></i>}
          label='Tools'
          parentMenuOpen={open}
          delay={500}
          MenuProps={{
            transformOrigin: { vertical: 'top', horizontal: 396 }
          }}
        >
          <MenuItem onClick={handleClose}>
            <i className='tabler-barcode text-[1rem]' /> Barcode Generator
          </MenuItem>
        </NestedMenuItem>
      </Menu>
    </div>
  )
}
