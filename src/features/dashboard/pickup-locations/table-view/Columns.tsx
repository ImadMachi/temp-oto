import { Checkbox, Chip, Typography } from '@mui/material'
import { useMemo } from 'react'
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import { type PickupLocationType } from '@/types/pickupLocationTypes'
import ActionMenu from './ActionMenu'
import { type ThemeColor } from '@/@core/types'

export type ECommercePickupLocationTypeWithAction = PickupLocationType & {
  action?: string
}
const columnHelper = createColumnHelper<ECommercePickupLocationTypeWithAction>()

type StatusChipColorType = {
  color: ThemeColor
}
export const statusChipColor: { [key: string]: StatusChipColorType } = {
  active: { color: 'success' },
  inactive: { color: 'error' }
}

type ColumnProps = {
  data: PickupLocationType[]
  setData: (data: PickupLocationType[]) => void
  locale: string | string[]
}
const useColumns = ({ data, setData, locale }: ColumnProps) =>
  useMemo<ColumnDef<ECommercePickupLocationTypeWithAction, any>[]>(
    () => [
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
              id: row.original.id.toString(),
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('label', {
        header: 'Label',
        cell: ({ row }) => <Typography className='text-sm'>{row.original.label}</Typography>
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
      columnHelper.accessor('zipCode', {
        header: 'Zip Code',
        cell: ({ row }) => (
          <Typography component='span' className='font-normal'>
            {row.original.zipCode}
          </Typography>
        )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => <ActionMenu pickupLocation={row.original} />,
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  )

export default useColumns
