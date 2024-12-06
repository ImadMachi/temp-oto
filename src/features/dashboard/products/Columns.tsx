import { type ProductListType } from '@/types/productTypes'
import { Checkbox, Typography } from '@mui/material'
import { useMemo } from 'react'
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import { type ThemeColor } from '@core/types'
import { type ActionMenuProps } from './ActionMenu'
import Image from 'next/image'

export type ECommerceProductListTypeWithAction = ProductListType & {
  action?: string
}
const columnHelper = createColumnHelper<ECommerceProductListTypeWithAction>()

type StatusChipColorType = {
  color: ThemeColor
}
export const statusChipColor: { [key: string]: StatusChipColorType } = {
  Delivered: { color: 'success' },
  Shipped: { color: 'info' },
  Pending: { color: 'warning' },
  Canceled: { color: 'secondary' }
}

type PaymentStatusChipColorType = {
  color: ThemeColor
}
export const paymentStatusChipColor: { [key: string]: PaymentStatusChipColorType } = {
  Paid: { color: 'success' },
  Pending: { color: 'warning' },
  Canceled: { color: 'secondary' }
}

type ReturnShipmentChipColorType = {
  color: ThemeColor
}
export const returnShipmentChipColor: { [key: string]: ReturnShipmentChipColorType } = {
  Yes: { color: 'success' },
  No: { color: 'error' }
}

type ReturnStatusChipColorType = {
  color: ThemeColor
}
export const returnStatusChipColor: { [key: string]: ReturnStatusChipColorType } = {
  // 'Pending' 'Shipped' 'Delivered' 'Cancelled'
  Pending: { color: 'warning' },
  Shipped: { color: 'info' },
  Delivered: { color: 'success' },
  Canceled: { color: 'secondary' }
}

type ColumnProps = {
  data: ProductListType[]
  setData: (data: ProductListType[]) => void
  locale: string | string[]
  actionMenu: (props: ActionMenuProps) => JSX.Element
}
const useColumns = ({ data, setData, locale, actionMenu: ActionMenu }: ColumnProps) =>
  useMemo<ColumnDef<ECommerceProductListTypeWithAction, any>[]>(
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
      columnHelper.accessor('name', {
        header: 'Product',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <Image
              src={row.original.imageUrl}
              width={38}
              height={38}
              alt={row.original.name}
              className='rounded bg-actionHover'
            />
            <div className='flex flex-col'>
              <Typography className='font-medium' color='text.primary'>
                {row.original.name}
              </Typography>
              <Typography variant='body2'>{row.original.description}</Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('category', {
        header: 'Category',
        cell: ({ row }) => <Typography className='text-sm'>{row.original.category}</Typography>
      }),
      columnHelper.accessor('sku', {
        header: 'SKU',
        cell: ({ row }) => <Typography className='text-sm'>{row.original.sku}</Typography>
      }),
      columnHelper.accessor('barcode', {
        header: 'Barcode',
        cell: ({ row }) => <Typography className='text-sm'>{row.original.barcode}</Typography>
      }),
      columnHelper.accessor('price', {
        header: 'Price',
        cell: ({ row }) => (
          <div className='flex items-center justify-end gap-3'>
            <div className='flex flex-col'>
              <Typography component='span' className='font-normal'>
                {row.original.price} {row.original.currency}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => <ActionMenu product={row.original} />,
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  )

export default useColumns
