import type { WarehouseType } from '@/types/warehouseTypes'
import { Checkbox, Chip, Typography } from '@mui/material'
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import { statusChipColor } from '../utils/helpers'
import ActionMenu from './ActionMenu'

type WarehouseTypeWithAction = WarehouseType & {
  action?: string
}

const columnHelper = createColumnHelper<WarehouseTypeWithAction>()

const getColumns = ({
  setSelectedWarehouse,
  setDeleteDialogOpen,
  setEditDialogOpen
}: {
  setSelectedWarehouse: (warehouse: WarehouseType | null) => void
  setDeleteDialogOpen: (open: boolean) => void
  setEditDialogOpen: (open: boolean) => void
}): ColumnDef<WarehouseTypeWithAction, any>[] => [
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
  columnHelper.accessor('name', {
    header: 'Name',
    cell: ({ row }) => (
      <div className='flex items-center gap-4'>
        <Typography color='text.primary' className='font-medium'>
          {row.original.name}
        </Typography>
      </div>
    )
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: ({ row }) => (
      <Chip
        label={row.original.status}
        color={statusChipColor[row.original.status]?.color}
        variant='tonal'
        size='small'
      />
    )
  }),
  columnHelper.accessor('address', {
    header: 'Full Address',
    cell: ({ row }) => (
      <div className='flex items-center gap-3'>
        <div className='flex flex-col max-w-[200px]'>
          <Typography className='truncate' title={row.original.address}>
            {row.original.address}
          </Typography>
        </div>
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
  columnHelper.accessor('city', {
    header: 'City',
    cell: ({ row }) => (
      <Typography component='span' className='font-normal'>
        {row.original.city}
      </Typography>
    )
  }),
  columnHelper.accessor('state', {
    header: 'State',
    cell: ({ row }) => (
      <Typography component='span' className='font-normal'>
        {row.original.state}
      </Typography>
    )
  }),
  columnHelper.accessor('country', {
    header: 'Country',
    cell: ({ row }) => (
      <Typography component='span' className='font-normal'>
        {row.original.country}
      </Typography>
    )
  }),
  columnHelper.accessor('zip_code', {
    header: 'Zip Code',
    cell: ({ row }) => (
      <Typography component='span' className='font-normal'>
        {row.original.zip_code}
      </Typography>
    )
  }),
  columnHelper.accessor('action', {
    header: 'Action',
    cell: ({ row }) => (
      <ActionMenu
        warehouse={row.original}
        setSelectedWarehouse={setSelectedWarehouse}
        setDeleteDialogOpen={setDeleteDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
      />
    ),
    enableSorting: false
  })
]

export default getColumns
