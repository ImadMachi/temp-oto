import type { SalesChannelType } from '@/types/SalesChannelTypes'
import { Card, CardContent, Grid, IconButton, Switch, Typography } from '@mui/material'

interface SalesChannelCardProps {
  salesChannel: SalesChannelType
  handleOpen: () => void
}
export default function SalesChannelCard({ salesChannel, handleOpen }: SalesChannelCardProps) {
  return (
    <Grid item xs={6} sm={4} md={3} lg={2.4} className='box-border p-2'>
      <Card className='w-full h-full'>
        <CardContent className='h-full flex flex-col items-center justify-between pt-4'>
          <img
            src={salesChannel.imageUrl}
            alt={salesChannel.name}
            title={salesChannel.name}
            className='w-1/3 self-center h-fit object-cover rounded-sm shadow-sm cursor-pointer hover:scale-110 transition-all'
          />
          <div className='mt-4 text-center'>
            <Typography variant='h6'>{salesChannel.name}</Typography>
            <div className='mt-4'>
              <Switch defaultChecked size='small' />

              <IconButton
                onClick={handleOpen}
                sx={{
                  '&:hover': {
                    color: t => t.palette.success.main,
                    backgroundColor: t => `${t.palette.success.lighterOpacity}!important`
                  }
                }}
              >
                <i className='tabler-edit' />
              </IconButton>
              <IconButton
                sx={{
                  '&:hover': {
                    color: t => t.palette.error.main,
                    backgroundColor: t => `${t.palette.error.lighterOpacity}!important`
                  }
                }}
              >
                <i className='tabler-trash' />
              </IconButton>
            </div>
          </div>
        </CardContent>
      </Card>
    </Grid>
  )
}
