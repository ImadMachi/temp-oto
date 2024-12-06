'use client'
import { useEffect, useState } from 'react'
import type { ShippingPartnerType } from '@/types/ShippingPartnerTypes'
import { getShippingPartners } from '@/app/server/actions'
import { Grid, Typography } from '@mui/material'
import PartnerCard from './PartnerCard'
import ConnectPartnerDialog from './ConnectPartnerDialog'
import ConnectedPartnerCardSkeleton from '@/components/skeletons/ConnectedPartnerCardSkeleton'

export default function ConnectedList() {
  // States
  const [shippingPartners, setShippingPartners] = useState<ShippingPartnerType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = useState(false)

  // Effects
  useEffect(() => {
    ;(async () => {
      const shippingPartners = await getShippingPartners()
      setShippingPartners(shippingPartners.slice(0, 3))
      setIsLoading(false)
    })()
  }, [])

  // Methods
  const handleOpen = () => setOpen(true)
  return (
    <div>
      <Grid container>
        {isLoading
          ? Array.from({ length: 40 }).map((_, i) => <ConnectedPartnerCardSkeleton key={i} />)
          : shippingPartners.map(partner => <PartnerCard key={partner.id} partner={partner} handleOpen={handleOpen} />)}
        {shippingPartners.length === 0 && (
          <Grid item xs={12} className='text-center pt-8'>
            <Typography>No Shipping Partners Found</Typography>
          </Grid>
        )}
      </Grid>
      <ConnectPartnerDialog open={open} setOpen={setOpen} />
    </div>
  )
}
