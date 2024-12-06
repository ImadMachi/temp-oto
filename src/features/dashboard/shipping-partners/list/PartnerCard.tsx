import type { ShippingPartnerType } from '@/types/ShippingPartnerTypes'
import { Grid } from '@mui/material'

interface PartnerCardProps {
  partner: ShippingPartnerType
  handleOpen: () => void
}
export default function PartnerCard({ partner, handleOpen }: PartnerCardProps) {
  return (
    <Grid item xs={4} sm={3} md={2} lg={1.2} className='flex justify-center items-center'>
      <img
        src={partner.imageUrl}
        alt={partner.name}
        title={partner.name}
        className='w-full h-fit object-cover rounded-sm shadow-sm cursor-pointer hover:scale-110 transition-all'
        onClick={handleOpen}
      />
    </Grid>
  )
}
