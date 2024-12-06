import { Card, CardContent, Grid, Skeleton } from '@mui/material'

export default function ConnectedPartnerCardSkeleton() {
  return (
    <Grid item xs={6} sm={4} md={3} lg={2.4} className='box-border p-2'>
      <Card className='w-full h-full'>
        <CardContent className='h-full flex flex-col items-center justify-between pt-4'>
          {/* <img className='w-1/3 self-center h-fit object-cover rounded-sm shadow-sm cursor-pointer hover:scale-110 transition-all' /> */}
          <Skeleton className='w-1/3 aspect-[1/1]' />
          <div className='mt-4 flex flex-col items-center'>
            <Skeleton variant='text' width={100} />
            <Skeleton variant='text' width={100} />
            <div className='mt-4 flex justify-center items-center gap-2'>
              <Skeleton variant='rounded' width={50} height={20} />
              <Skeleton variant='circular' width={20} height={20} />
              <Skeleton variant='circular' width={20} height={20} />
            </div>
          </div>
        </CardContent>
      </Card>
    </Grid>
  )
}
