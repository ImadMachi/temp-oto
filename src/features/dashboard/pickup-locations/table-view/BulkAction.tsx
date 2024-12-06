import { Button, Menu, MenuItem } from '@mui/material'
import { type MouseEvent, useState } from 'react'

export default function BulkAction() {
  // States
  const [anchorManage, setAnchorManage] = useState<HTMLElement | null>(null)

  // Methods
  const handleClickManage = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorManage(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorManage(null)
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
        </Menu>
      </div>
    </>
  )
}
