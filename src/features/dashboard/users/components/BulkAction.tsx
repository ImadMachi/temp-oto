import type { UserType } from '@/types/userTypes'
import { Button, Menu, MenuItem } from '@mui/material'
import { type MouseEvent, useState } from 'react'
import DeleteUsersDialog from './DeleteUsersDialog'

interface BulkActionProps {
  selectedUsers: UserType[]
}
export default function BulkAction({ selectedUsers }: BulkActionProps) {
  // States
  const [anchorManage, setAnchorManage] = useState<HTMLElement | null>(null)
  const [deleteUsersDialogOpen, setDeleteUsersDialogOpen] = useState(false)

  // Methods
  const handleClickManage = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorManage(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorManage(null)
  }

  const handleDeleteUsers = () => {
    setDeleteUsersDialogOpen(true)
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
          <MenuItem onClick={handleDeleteUsers}>
            <i className='tabler-trash' /> Delete selected users
          </MenuItem>
        </Menu>

        <DeleteUsersDialog
          selectedUsers={selectedUsers}
          open={deleteUsersDialogOpen}
          setOpen={setDeleteUsersDialogOpen}
        />
      </div>
    </>
  )
}
