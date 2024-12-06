'use client'

import type { ChartConfig } from '@/types/apexchartsTypes'
import { Grid, Typography } from '@mui/material'
import Chart from 'react-apexcharts'

interface PendingPreparationCardProps {
  handleClose: () => void
}
export default function PendingPreparationCard({ handleClose }: PendingPreparationCardProps) {
  const chartConfig: ChartConfig = {
    options: {
      chart: {
        type: 'pie',
        height: 220
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            legend: {
              position: 'bottom',
              horizontalAlign: 'center',
              floating: false
            }
          }
        }
      ],
      labels: ['New Order', 'Need Confirmation']
    },
    series: [15, 10]
  }
  return (
    <>
      <Typography className='mb-3 flex items-center cursor-pointer' onClick={handleClose}>
        <i className='tabler-arrow-left mr-2'></i> Pending Preparation
      </Typography>
      <Grid container spacing={2} className='h-full items-center'>
        <Grid item xs={12}>
          <Chart
            options={chartConfig.options}
            series={chartConfig.series}
            type={chartConfig.options.chart?.type}
            height={chartConfig.options.chart?.height}
          />
        </Grid>
      </Grid>
    </>
  )
}
