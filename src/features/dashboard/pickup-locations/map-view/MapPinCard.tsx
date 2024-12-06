import { Chip, Typography } from '@mui/material'
import { statusChipColor } from '../table-view/Columns'
import { type PickupLocationType } from '@/types/pickupLocationTypes'
import ActionMenu from '../table-view/ActionMenu'

interface MapPinCardProps {
  pickupLocation: PickupLocationType
}
export default function MapPinCard({ pickupLocation }: MapPinCardProps) {
  return (
    <>
      <ActionMenu pickupLocation={pickupLocation} className='rotate-90 ml-auto mb-1' />
      <div>
        <Typography className='font-bold '>{pickupLocation.label}</Typography>
      </div>
      <div className='flex justify-between mt-4 gap-8'>
        <div className='basis-1/2'>
          <Chip
            label={pickupLocation.status}
            color={statusChipColor[pickupLocation.status]?.color}
            variant='outlined'
            size='small'
          />
        </div>
      </div>
    </>
  )
}
