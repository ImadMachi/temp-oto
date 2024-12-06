import type { LogType } from '@/types/logTypes'
import { Checkbox, Chip, Typography } from '@mui/material'
import { useMemo } from 'react'
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import { getLocalizedUrl } from '@/utils/i18n'
import Link from 'next/link'
import type { ThemeColor } from '@core/types'
import type { Locale } from '@/configs/i18n'

export type ECommerceLogTypeWithAction = LogType & {
  action?: string
}
const columnHelper = createColumnHelper<ECommerceLogTypeWithAction>()

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
  data: LogType[]
  locale: string | string[]
}
const useColumns = ({ data, locale }: ColumnProps) =>
  useMemo<ColumnDef<ECommerceLogTypeWithAction, any>[]>(
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
              id: row.original.id,
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('pickupId', {
        header: 'Pickup ID',
        cell: ({ row }) => (
          <Typography
            component={Link}
            href={getLocalizedUrl(`/apps/ecommerce/orders/details/${row.original.pickupId}`, locale as Locale)}
            color='primary'
          >{`${row.original.pickupId}`}</Typography>
        )
      }),
      columnHelper.accessor('orderId', {
        header: 'Order ID',
        cell: ({ row }) => (
          <Typography
            component={Link}
            href={getLocalizedUrl(`/apps/ecommerce/orders/details/${row.original.id}`, locale as Locale)}
            color='primary'
          >{`${row.original.id}`}</Typography>
        )
      }),
      columnHelper.accessor('orderDate', {
        header: 'Order Date',
        cell: ({ row }) => (
          <Typography className='text-sm'>{`${new Date(row.original.orderDate).toLocaleDateString()} ${new Date(row.original.orderDate).toLocaleTimeString()}`}</Typography>
        )
      }),
      columnHelper.accessor('deliveryCompany', {
        header: 'Delivery Company',
        cell: ({ row }) => <Typography className='text-sm'>{row.original.deliveryCompany}</Typography>
      }),
      columnHelper.accessor('shipmentNumber', {
        header: 'Shipment Number',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <div className='flex flex-col'>
              <Typography component='span' className='font-normal'>
                {row.original.shipmentNumber}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('url', {
        header: 'URL',
        cell: ({ row }) => (
          <Typography className='text-sm truncate max-w-[200px]' title={row.original.url}>
            {row.original.url}
          </Typography>
        )
      }),
      columnHelper.accessor('webhookText', {
        header: 'Webhook Text',
        cell: ({ row }) => (
          <Typography className='text-sm truncate max-w-[200px]' title={row.original.webhookText}>
            {row.original.webhookText}
          </Typography>
        )
      }),
      columnHelper.accessor('errorTime', {
        header: 'Error Time',
        cell: ({ row }) => (
          <Typography className='text-sm'>{`${new Date(row.original.errorTime).toLocaleDateString()} ${new Date(row.original.errorTime).toLocaleTimeString()}`}</Typography>
        )
      }),
      columnHelper.accessor('errorMessage', {
        header: 'Error Message',
        cell: ({ row }) => (
          <Typography className='text-sm truncate max-w-[200px]' title={row.original.errorMessage}>
            {row.original.errorMessage}
          </Typography>
        )
      }),
      columnHelper.accessor('method', {
        header: 'Method',
        cell: ({ row }) => <Typography className='text-sm'>{row.original.method}</Typography>
      }),
      columnHelper.accessor('nextAttemptTime', {
        header: 'Next Attempt Time',
        cell: ({ row }) => (
          <Typography className='text-sm'>{`${new Date(row.original.nextAttemptTime).toLocaleDateString()} ${new Date(row.original.nextAttemptTime).toLocaleTimeString()}`}</Typography>
        )
      }),
      columnHelper.accessor('numberOfAttempts', {
        header: 'Number of Attempts',
        cell: ({ row }) => <Typography className='text-sm'>{row.original.numberOfAttempts}</Typography>
      }),
      columnHelper.accessor('createdDate', {
        header: 'Created Date',
        cell: ({ row }) => (
          <Typography className='text-sm'>{`${new Date(row.original.createdDate).toLocaleDateString()} ${new Date(row.original.createdDate).toLocaleTimeString()}`}</Typography>
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
      columnHelper.accessor('logStatus', {
        header: 'LOG Status',
        cell: ({ row }) => (
          <Chip
            label={row.original.logStatus}
            color={statusChipColor[row.original.logStatus]?.color}
            variant='tonal'
            size='small'
          />
        )
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  )

export default useColumns
