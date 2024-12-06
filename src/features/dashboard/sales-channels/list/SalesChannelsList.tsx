'use client'
import { useEffect, useState } from 'react'
import { getSalesChannels } from '@/app/server/actions'
import { Card, CardContent, Grid, Skeleton, Typography } from '@mui/material'
import type { SalesChannelType } from '@/types/SalesChannelTypes'
import SalesChannelsFilters from './SalesChannelsFilters'
import SalesChannelCard from './SalesChannelCard'
import ConnectSalesChannelDialog from '../connect-channel-dialog'

export default function SalesChannelsList() {
  // States
  const [salesChannels, setSalesChannels] = useState<SalesChannelType[]>([])
  const [AllSalesChannels, setAllSalesChannels] = useState<SalesChannelType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = useState(false)

  // Effects
  useEffect(() => {
    ;(async () => {
      const salesChannels = await getSalesChannels()
      setSalesChannels(salesChannels)
      setAllSalesChannels(salesChannels)
      setIsLoading(false)
    })()
  }, [])

  // Methods
  const handleOpen = () => setOpen(true)
  return (
    <div>
      <Card>
        <CardContent>
          <SalesChannelsFilters
            salesChannels={salesChannels}
            setSalesChannels={setSalesChannels}
            allSalesChannels={AllSalesChannels}
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
              : salesChannels.map(salesChannel => (
                  <SalesChannelCard key={salesChannel.id} salesChannel={salesChannel} handleOpen={handleOpen} />
                ))}
            {salesChannels.length === 0 && (
              <Grid item xs={12} className='text-center pt-8'>
                <Typography>No Sales Channels Found</Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
      <ConnectSalesChannelDialog open={open} setOpen={setOpen} />
    </div>
  )
}
