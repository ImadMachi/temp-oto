import { Chip, Divider, Typography } from '@mui/material'
import { statusChipColor } from '../table-view/Columns'
import { type OrderType } from '@/types/orderTypes'
import { type ActionMenuProps } from '../table-view/OrderListTable'

interface MapPinCardProps {
  order: OrderType
  actionMenu: (props: ActionMenuProps) => JSX.Element
}
export default function MapPinCard({ order, actionMenu: ActionMenu }: MapPinCardProps) {
  return (
    <>
      <ActionMenu order={order} className='rotate-90 ml-auto mb-1' />
      {/* <Box
        className='absolute w-5 h-5 rotate-45 -bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2'
        sx={{ backgroundColor: t => t.palette.background.paper }}
      ></Box> */}
      <div className='flex justify-between items-center'>
        <Typography className='font-bold '>{order.id}</Typography>
        <Typography className='font-bold whitespace-nowrap text-xl' title='Order Grand Total'>
          {order.currency == 'USD' ? '$' : order.currency} {order.orderGrandTotal}
        </Typography>
      </div>
      <Divider />
      <div className='flex justify-between mt-4 gap-8'>
        <div className='basis-1/2'>
          <Typography className='font-light text-sm mb-1'>Status</Typography>
          <Chip label={order.status} color={statusChipColor[order.status]?.color} variant='tonal' size='medium' />
        </div>
        <div className='basis-1/2'>
          <Typography className='font-light text-sm mb-1 whitespace-nowrap'>Payment Method</Typography>
          <div className='flex flex-col'>
            <div className='flex items-center'>
              <div className='flex mr-2 justify-center items-center bg-[#F6F8FA] rounded-sm is-[29px] bs-[18px]'>
                <img src={order.paymentMethodImageUrl} height={14} />
              </div>
              <Typography>{order.paymentMethod}</Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
