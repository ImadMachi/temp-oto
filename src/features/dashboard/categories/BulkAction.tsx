import { Button, Menu, MenuItem } from '@mui/material'
import { type MouseEvent, useState } from 'react'

export default function BulkAction() {
  // States
  const [anchorManage, setAnchorManage] = useState<HTMLElement | null>(null)
  const [anchorTools, setAnchorTools] = useState<null | HTMLElement>(null)

  const handleClickManage = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorManage(event.currentTarget)
  }

  const handleClickTools = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorTools(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorManage(null)
    setAnchorTools(null)
  }

  return (
    <div className='flex max-sm:flex-col sm:items-center gap-4'>
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
          <MenuItem onClick={handleClose}>
            <i className='tabler-edit text-[1rem]' /> Edit Product
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <i className='tabler-eye text-[1rem]' /> View Product
          </MenuItem>
        </Menu>
      </div>
    </div>
  )
}
