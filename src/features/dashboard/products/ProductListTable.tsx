'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TablePagination from '@mui/material/TablePagination'
import MenuItem from '@mui/material/MenuItem'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import type { FilterFn } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'

// Type Imports
import type { ProductListType } from '@/types/productTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import TablePaginationComponent from '@components/TablePaginationComponent'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import DebouncedInput from '@/components/DebouncedInput'
import TableBodySkeleton from '@/components/skeletons/TableBodySkeleton'
import { type ActionMenuProps } from './ActionMenu'
import useColumns from './Columns'
import AddProductDialog from './AddProductDialog'
import GenerateBarcodeDialog from './GenerateBarcodeDialog'
import { type BulkActionProps } from './BulkAction'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

interface ProductListTableProps {
  data: ProductListType[]
  setData: (data: ProductListType[]) => void
  isLoading: boolean
  children: {
    bulkAction: (props: BulkActionProps) => JSX.Element
    actionMenu: (props: ActionMenuProps) => JSX.Element
  }
}
const ProductListTable = ({ data, setData, isLoading, children }: ProductListTableProps) => {
  // Vars
  const { bulkAction: BulkAction, actionMenu } = children

  // States
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [productDialogState, setProductDialogState] = useState<'add' | 'edit' | 'view' | null>(null)
  const [isBarcodeDialogOpen, setIsBarcodeDialogOpen] = useState(false)

  // Hooks
  const { lang: locale } = useParams()

  const columns = useColumns({ data, setData, locale, actionMenu })
  const table = useReactTable({
    data: data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true,
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getRowId: row => row.id,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    enableColumnResizing: true,
    defaultColumn: {
      size: 200
    }
  })

  // const getAvatar = (params:  Pick<ProductListType, 'avatar' | 'customer'>) => {
  //   const { avatar, customer } = params

  //   if (avatar) {
  //     return <CustomAvatar src={avatar} skin='light' size={34} />
  //   } else {
  //     return (
  //       <CustomAvatar skin='light' size={34}>
  //         {getInitials(customer as string)}
  //       </CustomAvatar>
  //     )
  //   }
  // }

  return (
    <Card>
      <CardContent className='flex justify-between max-sm:flex-col sm:items-center gap-4'>
        <BulkAction
          openBarcodeDialog={() => {
            setIsBarcodeDialogOpen(true)
          }}
        />
        <div className='flex items-center max-sm:flex-col gap-4 max-sm:is-full is-auto'>
          <DebouncedInput
            fullWidth
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Search'
            className='sm:is-auto'
          />
          <Button
            variant='tonal'
            color='secondary'
            startIcon={<i className='tabler-upload' />}
            className='max-sm:is-full is-auto'
          >
            Export
          </Button>
          <Button
            variant='contained'
            color='primary'
            className='max-sm:is-full mr-2'
            startIcon={<i className='tabler-plus' />}
            onClick={() => setProductDialogState('add')}
          >
            Add Product
          </Button>
        </div>
      </CardContent>
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
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
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
          ) : table.getFilteredRowModel().rows.length == 0 ? (
            <tbody>
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                  No data available
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
                        <td key={cell.id}>
                          <div>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                        </td>
                      ))}
                    </tr>
                  )
                })}
            </tbody>
          )}
        </table>
      </div>
      <div className='flex items-center justify-end'>
        <TablePagination
          component={() => <TablePaginationComponent table={table as any} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
        />
        <CustomTextField
          select
          value={table.getState().pagination.pageSize}
          onChange={e => table.setPageSize(Number(e.target.value))}
          className='is-[70px] max-sm:is-full mr-6'
        >
          <MenuItem value='10'>10</MenuItem>
          <MenuItem value='25'>25</MenuItem>
          <MenuItem value='50'>50</MenuItem>
          <MenuItem value='100'>100</MenuItem>
        </CustomTextField>
      </div>
      <AddProductDialog productDialogState={productDialogState} setProductDialogState={setProductDialogState} />
      <GenerateBarcodeDialog open={isBarcodeDialogOpen} setOpen={setIsBarcodeDialogOpen} />
    </Card>
  )
}

export default ProductListTable
