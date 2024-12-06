import type { SalesChannelType } from '@/types/SalesChannelTypes'
import { Grid } from '@mui/material'

interface SalesChannelCardProps {
  salesChannel: SalesChannelType
  handleOpen: () => void
}
export default function SalesChannelCard({ salesChannel, handleOpen }: SalesChannelCardProps) {
  return (
    <Grid item xs={4} sm={3} md={2} lg={1.2} className='flex justify-center items-center'>
      <img
        src={salesChannel.imageUrl}
        alt={salesChannel.name}
        title={salesChannel.name}
        className='w-full h-fit object-cover rounded-sm shadow-sm cursor-pointer hover:scale-110 transition-all'
        onClick={handleOpen}
      />
    </Grid>
  )
}
