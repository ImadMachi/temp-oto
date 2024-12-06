'use client'
import { useEffect, useState } from 'react'
import { getSalesChannels } from '@/app/server/actions'
import { Grid, Typography } from '@mui/material'
import ConnectedPartnerCardSkeleton from '@/components/skeletons/ConnectedPartnerCardSkeleton'
import type { SalesChannelType } from '@/types/SalesChannelTypes'
import SalesChannelCard from './SalesChannelCard'
import ConnectSalesChannelDialog from '../connect-channel-dialog'

export default function ConnectedList() {
  // States
  const [salesChannels, setSalesChannels] = useState<SalesChannelType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = useState(false)

  // Effects
  useEffect(() => {
    ;(async () => {
      const salesChannels = await getSalesChannels()
      setSalesChannels(salesChannels.slice(0, 3))
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
          : salesChannels.map(salesChannel => (
              <SalesChannelCard key={salesChannel.id} salesChannel={salesChannel} handleOpen={handleOpen} />
            ))}
        {salesChannels.length === 0 && (
          <Grid item xs={12} className='text-center pt-8'>
            <Typography>No Sales Channels Found</Typography>
          </Grid>
        )}
      </Grid>
      <ConnectSalesChannelDialog open={open} setOpen={setOpen} />
    </div>
  )
}
