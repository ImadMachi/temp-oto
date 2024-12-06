'use client'
import { useEffect, useState } from 'react'
import type { ShippingPartnerType } from '@/types/ShippingPartnerTypes'
import { getShippingPartners } from '@/app/server/actions'
import { Box, Card, CardContent, Grid, Skeleton, Typography } from '@mui/material'
import PartnerCard from './PartnerCard'
import ConnectPartnerDialog from './ConnectPartnerDialog'
import PartnersFilters from './PartnersFilters'

export default function ShippingPartnersList() {
  // States
  const [shippingPartners, setShippingPartners] = useState<ShippingPartnerType[]>([])
  const [AllShippingPartners, setAllShippingPartners] = useState<ShippingPartnerType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = useState(false)

  // Effects
  useEffect(() => {
    ;(async () => {
      const shippingPartners = await getShippingPartners()
      setShippingPartners(shippingPartners)
      setAllShippingPartners(shippingPartners)
      setIsLoading(false)
    })()
  }, [])

  // Methods
  const handleOpen = () => setOpen(true)
  return (
    <div>
      <Card>
        <CardContent>
          <PartnersFilters
            partners={shippingPartners}
            setPartners={setShippingPartners}
            allPartners={AllShippingPartners}
          />
        </CardContent>
        <CardContent>
          <Grid container spacing={5}>
            {isLoading
              ? Array.from({ length: 40 }).map((_, i) => (
                  <Grid key={i} item xs={4} sm={3} md={2} lg={1.2} className='flex justify-center items-center'>
                    <Skeleton
                      variant='rectangular'
                      className='w-full h-fit object-cover rounded-sm shadow-sm aspect-[1/1]'
                    />
                  </Grid>
                ))
              : shippingPartners.map(partner => (
                  <PartnerCard key={partner.id} partner={partner} handleOpen={handleOpen} />
                ))}
            {shippingPartners.length === 0 && (
              <Grid item xs={12} className='text-center pt-8'>
                <Typography>No Shipping Partners Found</Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
      <ConnectPartnerDialog open={open} setOpen={setOpen} />
    </div>
  )
}
