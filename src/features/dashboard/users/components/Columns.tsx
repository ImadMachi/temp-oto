import type { UserGroupType, UserType } from '@/types/userTypes'
import { Checkbox, Icon, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { createColumnHelper, type ColumnDef, type Row } from '@tanstack/react-table'
import { getAvatar, userRoleObj } from '../utils/helpers'
import { useState, type MouseEvent } from 'react'

type UserTypeWithAction = UserType & {
  action?: string
}

const columnHelper = createColumnHelper<UserTypeWithAction>()

const getColumns = ({
  setSelectedUser,
  setDeleteDialogOpen,
  setEditDialogOpen
}: {
  setSelectedUser: (user: UserType | null) => void
  setDeleteDialogOpen: (open: boolean) => void
  setEditDialogOpen: (open: boolean) => void
}): ColumnDef<UserTypeWithAction, any>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler()
        }}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        {...{
          checked: row.getIsSelected(),
          disabled: !row.getCanSelect(),
          indeterminate: row.getIsSomeSelected(),
          onChange: row.getToggleSelectedHandler()
        }}
      />
    )
  },
  columnHelper.accessor('full_name', {
    header: 'User',
    cell: ({ row }) => (
      <div className='flex items-center gap-4'>
        {getAvatar({ profile: row.original.profile, full_name: row.original.full_name })}
        <div className='flex flex-col'>
          <Typography color='text.primary' className='font-medium'>
            {row.original.full_name}
          </Typography>
          <Typography variant='body2'>{row.original.email}</Typography>
        </div>
      </div>
    )
  }),
  columnHelper.accessor('groups', {
    header: 'Role',
    cell: ({ row }) => (
      <div className='flex flex-wrap gap-2'>
        {row.original.groups.map((group: UserGroupType) => (
          <div key={group.id} className='flex items-center gap-2'>
            <Icon
              className={`${userRoleObj[group.id].icon} text-md`}
              sx={{ color: `var(--mui-palette-${userRoleObj[group.id].color}-main)` }}
            />
            <Typography className='capitalize text-sm' color='text.primary'>
              {group.name}
            </Typography>
          </div>
        ))}
      </div>
    )
  }),
  columnHelper.accessor('phone', {
    header: 'Phone',
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <Typography variant='body1'>{row.original.phone}</Typography>
      </div>
    )
  }),
  // columnHelper.accessor('status', {
  //   header: 'Status',
  //   cell: ({ row }) => (
  //     <div className='flex items-center gap-3'>
  //       <Chip
  //         variant='tonal'
  //         label={row.original.status}
  //         size='small'
  //         color={userStatusObj[row.original.status]}
  //         className='capitalize'
  //       />
  //     </div>
  //   )
  // }),
  columnHelper.accessor('action', {
    header: 'Action',
    cell: ({ row }) => (
      <TableActionCell
        row={row}
        setSelectedUser={setSelectedUser}
        setDeleteDialogOpen={setDeleteDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
      />
    ),
    enableSorting: false
  })
]

interface TableActionCellProps {
  setSelectedUser: (user: UserType | null) => void
  setDeleteDialogOpen: (open: boolean) => void
  setEditDialogOpen: (open: boolean) => void
  row: Row<UserTypeWithAction>
}
const TableActionCell = ({ row, setSelectedUser, setDeleteDialogOpen, setEditDialogOpen }: TableActionCellProps) => {
  const [anchorEl, setAnchorEl] = useState<null | Element>(null)
  const open = Boolean(anchorEl)

  const handleClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => setAnchorEl(e.currentTarget)

  const handleDelete = () => {
    setSelectedUser(row.original)
    setDeleteDialogOpen(true)
    handleClose()
  }

  const handleEdit = () => {
    setSelectedUser(row.original)
    setEditDialogOpen(true)
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
      </Menu>
    </div>
  )
}

export default getColumns
