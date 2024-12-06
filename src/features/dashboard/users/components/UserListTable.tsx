'use client'

// React Imports
import { useState, useMemo } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'

// Third-party Imports
import classnames from 'classnames'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getSortedRowModel
} from '@tanstack/react-table'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import useUsers from '../hooks/useUsers'
import getColumns from './Columns'
import { fuzzyFilter } from '../utils/helpers'
import DeleteUserDialog from './DeleteUserDialog'
import type { UserType } from '@/types/userTypes'
import AddUserDrawer from './AddUserDrawer'
import EditUserDialog from './EditUserDialog'
import TableBodySkeleton from '@/components/skeletons/TableBodySkeleton'
import Image from 'next/image'
import BulkAction from './BulkAction'
import { Typography } from '@mui/material'

const UserListTable = () => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [addDrawerOpen, setAddDrawerOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)

  // Hooks
  const { data: users, isError, isLoading } = useUsers()
  const columns = useMemo(
    () => getColumns({ setSelectedUser, setDeleteDialogOpen, setEditDialogOpen }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [users]
  )
  const filteredData = useMemo(() => users ?? [], [users])
  const table = useReactTable({
    data: filteredData,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  return (
    <>
      <Card>
        <div className='p-6 border-bs'>
          <Typography variant='h3' className='flex items-center font-semibold gap-2 mb-3'>
            <i className='tabler-users text-3xl'></i> <span>Users</span>
          </Typography>
          <div className='flex justify-between flex-col items-start md:flex-row md:items-center gap-4'>
            <div>
              {table.getSelectedRowModel().rows.map(row => row.original).length > 0 && (
                <BulkAction selectedUsers={table.getSelectedRowModel().rows.map(row => row.original)} />
              )}
            </div>
            <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center sm:justify-end gap-4'>
              <Button
                variant='contained'
                startIcon={<i className='tabler-plus' />}
                onClick={() => setAddDrawerOpen(true)}
                className='max-sm:is-full'
              >
                Add New User
              </Button>
            </div>
          </div>
        </div>

        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classnames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort()
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <i className='tabler-chevron-up text-xl' />,
                              desc: <i className='tabler-chevron-down text-xl' />
                            }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {isLoading ? (
              <TableBodySkeleton length={table.getVisibleFlatColumns().length} />
            ) : table.getRowModel().rows.length === 0 && !isError ? (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    No users found, please add a user
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map(row => {
                    return (
                      <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>
                    )
                  })}
              </tbody>
            )}
          </table>
        </div>
        {isError && (
          <div>
            <div className='relative my-6 md:my-10 w-56 sm:w-72 md:w-96 aspect-[4/3] mx-auto'>
              <Image src='/images/illustrations/errors/something-went-wrong.jpg' alt='Something went wrong' fill />
            </div>
          </div>
        )}

        {deleteDialogOpen && selectedUser && (
          <DeleteUserDialog
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            open={deleteDialogOpen}
            setOpen={setDeleteDialogOpen}
          />
        )}

        {addDrawerOpen && <AddUserDrawer open={addDrawerOpen} setOpen={setAddDrawerOpen} />}

        {editDialogOpen && selectedUser && (
          <EditUserDialog
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            open={editDialogOpen}
            setOpen={setEditDialogOpen}
          />
        )}
      </Card>
    </>
  )
}

export default UserListTable
