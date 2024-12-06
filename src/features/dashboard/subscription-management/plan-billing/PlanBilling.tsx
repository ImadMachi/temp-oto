'use client'

import { Button, Card, CardContent, Chip, Grid, Typography } from '@mui/material'
import ChangePlanDialog from './ChangePlanDialog'
import { useState } from 'react'

export default function PlanBilling() {
  // States
  const [planDialogOpen, setPlanDialogOpen] = useState(false)
  return (
    <Card>
      <CardContent>
        <div className='flex flex-col justify-between items-center sm:flex-row'>
          <Typography className='mb-4'>Current Plan</Typography>
          <div className='sm:flex'>
            <Button
              variant='outlined'
              className='mr-4 mb-2 sm:mb-0'
              size='small'
              fullWidth
              onClick={() => setPlanDialogOpen(true)}
            >
              Change Plan
            </Button>
            <Button variant='tonal' className='whitespace-nowrap' color='error' size='small' fullWidth>
              Cancel Subscription
            </Button>
          </div>
        </div>
        <Grid container spacing={2} className='mt-4'>
          <Grid item xs={12} md={6} lg={4}>
            <Card className='flex justify-between py-5 px-7' sx={{ border: '1px solid', borderColor: 'divider' }}>
              <div className='flex flex-col gap-1'>
                <Typography variant='body2' color='text.secondary'>
                  Monthly Plan
                </Typography>
                <Typography variant='h5'>150 SAR/monthly</Typography>
              </div>
              <div>
                <Chip label='Standard' color='info' size='small' variant='tonal' className='mr-2' />
                <Chip label='Active' color='success' size='small' variant='tonal' />
              </div>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card className='flex py-5 px-7' sx={{ border: '1px solid', borderColor: 'divider' }}>
              <div className='flex flex-col gap-1'>
                <Typography variant='body2' color='text.secondary'>
                  Renew At
                </Typography>
                <Typography variant='h5'>Nov 20, 2024</Typography>
              </div>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
      <ChangePlanDialog open={planDialogOpen} setOpen={setPlanDialogOpen} />
    </Card>
  )
}
