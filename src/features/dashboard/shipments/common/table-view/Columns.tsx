import type { OrderType } from '@/types/orderTypes'
import { Checkbox, Chip, Typography } from '@mui/material'
import { useMemo } from 'react'
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import { getLocalizedUrl } from '@/utils/i18n'
import Link from 'next/link'
import type { ThemeColor } from '@core/types'
import type { Locale } from '@/configs/i18n'
import type { ActionMenuProps } from './OrderListTable'

export type ECommerceOrderTypeWithAction = OrderType & {
  action?: string
}
const columnHelper = createColumnHelper<ECommerceOrderTypeWithAction>()

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
  data: OrderType[]
  setData: (data: OrderType[]) => void
  locale: string | string[]
  actionMenu?: (props: ActionMenuProps) => JSX.Element
}
const useColumns = ({ data, setData, locale, actionMenu: ActionMenu }: ColumnProps) =>
  useMemo<ColumnDef<ECommerceOrderTypeWithAction, any>[]>(
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
      columnHelper.accessor('id', {
        header: 'Order ID',
        cell: ({ row }) => (
          <Typography
            component={Link}
            href={getLocalizedUrl(`/apps/ecommerce/orders/details/${row.original.id}`, locale as Locale)}
            color='primary'
          >{`${row.original.id}`}</Typography>
        )
      }),
      columnHelper.accessor('date', {
        header: 'Order Date',
        cell: ({ row }) => (
          <Typography className='text-sm'>{`${new Date(row.original.date).toLocaleDateString()} ${new Date(row.original.date).toLocaleTimeString()}`}</Typography>
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
      columnHelper.accessor('pickupLocation', {
        header: 'Pickup Location',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <div className='flex flex-col max-w-[200px]'>
              <Typography
                component={Link}
                href={getLocalizedUrl('/apps/ecommerce/customers/details/879861', locale as Locale)}
                color='text.primary'
                className='font-medium hover:text-primary truncate'
                title={row.original.pickupLocation}
              >
                {row.original.pickupLocation}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('customerName', {
        header: 'Customer',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            {/* {getAvatar({ avatar: row.original.avatar, customer: row.original.customerName })} */}
            <div className='flex flex-col'>
              <Typography component='span' className='font-normal'>
                {row.original.customerName}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('customerAddress', {
        header: 'Customer Address',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <div className='flex flex-col max-w-[200px]'>
              <Typography component='span' className='font-normal truncate' title={row.original.customerAddress}>
                {row.original.customerAddress}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('destinationCity', {
        header: 'Destination City',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <div className='flex flex-col'>
              <Typography component='span' className='font-normal'>
                {row.original.destinationCity}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('orderGrandTotal', {
        header: 'Order Grand Total',
        cell: ({ row }) => (
          <div className='flex items-center justify-end gap-3'>
            <div className='flex flex-col'>
              <Typography component='span' className='font-normal'>
                {row.original.orderGrandTotal} {row.original.currency}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('paymentStatus', {
        header: 'Payment Status',
        cell: ({ row }) => (
          <Chip
            label={row.original.paymentStatus}
            color={paymentStatusChipColor[row.original.paymentStatus].color}
            variant='tonal'
            size='small'
          />
        )
      }),
      columnHelper.accessor('paymentMethod', {
        header: 'Payment Method',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <div className='flex mr-2 justify-center items-center bg-[#F6F8FA] rounded-sm is-[29px] bs-[18px]'>
              <img src={row.original.paymentMethodImageUrl} height={14} />
            </div>
            <Typography>{row.original.paymentMethod}</Typography>
          </div>
        )
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
      columnHelper.accessor('deliveryCompany', {
        header: 'Delivery Company',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <div className='flex flex-col'>
              <Typography component='span' className='font-normal'>
                {row.original.deliveryCompany}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('trackingNumber', {
        header: 'Tracking Number',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <div className='flex flex-col'>
              <Typography component='span' className='font-normal'>
                {row.original.trackingNumber}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('onHoldReason', {
        header: 'On Hold Reason',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <div className='flex flex-col'>
              <Typography component='span' className='font-normal'>
                {row.original.onHoldReason}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('onHoldComment', {
        header: 'On Hold Comment',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <div className='flex flex-col max-w-[200px]'>
              <Typography component='span' className='font-normal truncate' title={row.original.onHoldComment}>
                {row.original.onHoldComment}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('deliveryDate', {
        header: 'Delivery Date',
        cell: ({ row }) => (
          <Typography className='text-sm'>{`${new Date(row.original.deliveryDate).toLocaleDateString()} ${new Date(row.original.deliveryDate).toLocaleTimeString()}`}</Typography>
        )
      }),
      columnHelper.accessor('DCReturnReason', {
        header: 'DC Return Reason',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <div className='flex flex-col min-w-[200px]'>
              <Typography component='span' className='font-normal' title={row.original.DCReturnReason}>
                {row.original.DCReturnReason}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('customerReturnReason', {
        header: 'Customer Return Reason',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <div className='flex flex-col min-w-[200px]'>
              <Typography component='span' className='font-normal truncate' title={row.original.customerReturnReason}>
                {row.original.customerReturnReason}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('customerReturnComment', {
        header: 'Customer Return Comment',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <div className='flex flex-col min-w-[200px]'>
              <Typography component='span' className='font-normal truncate' title={row.original.customerReturnComment}>
                {row.original.customerReturnComment}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('returnShipment', {
        header: 'Return Shipment',
        cell: ({ row }) => (
          <Chip
            label={row.original.returnShipment}
            color={returnShipmentChipColor[row.original.returnShipment]?.color}
            variant='tonal'
            size='small'
          />
        )
      }),
      columnHelper.accessor('returnDate', {
        header: 'Return Date',
        cell: ({ row }) => (
          <Typography className='text-sm'>{`${new Date(row.original.returnDate).toLocaleDateString()} ${new Date(row.original.returnDate).toLocaleTimeString()}`}</Typography>
        )
      }),
      columnHelper.accessor('returnStatus', {
        header: 'Return Status',
        cell: ({ row }) => (
          <Chip
            label={row.original.returnStatus}
            color={returnStatusChipColor[row.original.returnStatus]?.color}
            variant='tonal'
            size='small'
          />
        )
      }),
      columnHelper.accessor('cancelReason', {
        header: 'Cancel Reason',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <div className='flex flex-col'>
              <Typography component='span' className='font-normal'>
                {row.original.cancelReason}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('cancelComment', {
        header: 'Cancel Comment',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <div className='flex flex-col max-w-[200px]'>
              <Typography component='span' className='font-normal truncate' title={row.original.cancelComment}>
                {row.original.cancelComment}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (ActionMenu ? <ActionMenu order={row.original} /> : <></>),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  )

export default useColumns
