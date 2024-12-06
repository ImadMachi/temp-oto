// React Imports
import { useState, useMemo, useContext } from 'react'

// MUI Imports
import Card from '@mui/material/Card'

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
import getColumns from './Columns'
import { fuzzyFilter } from '../utils/helpers'
import TableBodySkeleton from '@/components/skeletons/TableBodySkeleton'
import Image from 'next/image'
import BulkAction from './BulkAction'
import useWarehouses from '../hooks/useWarehouses'
import type { WarehouseType } from '@/types/warehouseTypes'
import DeleteWarehouseDialog from './DeleteWarehouseDialog'
import EditWarehouseDrawer from './EditWarehouseDrawer'

const WarehouseListTable = () => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedWarehouse, setSelectedWarehouse] = useState<WarehouseType | null>(null)

  // Hooks
  const { data: warehouses, isError, isLoading } = useWarehouses()

  const columns = useMemo(
    () => getColumns({ setSelectedWarehouse, setDeleteDialogOpen, setEditDialogOpen }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [warehouses]
  )
  const filteredData = useMemo(() => warehouses ?? [], [warehouses])
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
        {table.getSelectedRowModel().rows.map(row => row.original).length > 0 && (
          <div className='flex justify-between flex-col items-start md:flex-row md:items-center gap-4 p-6'>
            <BulkAction selectedWarehouses={table.getSelectedRowModel().rows.map(row => row.original)} />
          </div>
        )}
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
                    No warehouses found, please add a new warehouse
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

        {editDialogOpen && selectedWarehouse && (
          <EditWarehouseDrawer
            open={editDialogOpen}
            setOpen={setEditDialogOpen}
            selectedWarehouse={selectedWarehouse}
          />
        )}

        {deleteDialogOpen && selectedWarehouse && (
          <DeleteWarehouseDialog
            selectedWarehouse={selectedWarehouse}
            setSelectedWarehouse={setSelectedWarehouse}
            open={deleteDialogOpen}
            setOpen={setDeleteDialogOpen}
          />
        )}
      </Card>
    </>
  )
}

export default WarehouseListTable
