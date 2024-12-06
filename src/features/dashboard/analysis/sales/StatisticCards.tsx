'use client'

import CustomAvatar from '@/@core/components/mui/Avatar'
import { Card, CardContent, Divider, Grid, Typography, useMediaQuery } from '@mui/material'
import type { Theme } from '@mui/material/styles'
import classnames from 'classnames'

// Vars
const data = [
  {
    value: '25325',
    title: 'Total Orders',
    icon: 'tabler-package'
  },
  {
    value: '657',
    title: 'Processing',
    icon: 'tabler-truck'
  },
  {
    value: '22658',
    title: 'Delivered',
    icon: 'tabler-truck-delivery'
  },
  {
    value: '954',
    title: 'Returned',
    icon: 'tabler-truck-return'
  },
  {
    value: '159',
    title: 'Cancelled',
    icon: 'tabler-x'
  }
]

export default function StatisticCards() {
  // Hooks
  const isBelowMdScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  const isBelowSmScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  return (
    <Card>
      <CardContent>
        <Grid container spacing={6}>
          {data.map((item, index) => (
            <Grid
              item
              xs={12}
              sm={4}
              md={2.4}
              key={index}
              className={classnames({
                '[&:nth-of-type(odd)>div]:pie-6 [&:nth-of-type(odd)>div]:border-ie':
                  isBelowMdScreen && !isBelowSmScreen,
                '[&:not(:last-child)>div]:pie-6 [&:not(:last-child)>div]:border-ie': !isBelowMdScreen
              })}
            >
              <div className='flex justify-between gap-4'>
                <div className='flex flex-col items-start'>
                  <Typography variant='h4'>{item.value.toLocaleString()}</Typography>
                  <Typography>{item.title}</Typography>
                </div>
                <CustomAvatar variant='rounded' size={42} skin='light'>
                  <i className={classnames(item.icon, 'text-[26px]')} />
                </CustomAvatar>
              </div>
              {isBelowMdScreen && !isBelowSmScreen && index < data.length - 2 && (
                <Divider
                  className={classnames('mbs-6', {
                    'mie-6': index % 2 === 0
                  })}
                />
              )}
              {isBelowSmScreen && index < data.length - 1 && <Divider className='mbs-6' />}
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}
