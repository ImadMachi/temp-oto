'use client'

import type { ChartConfig } from '@/types/apexchartsTypes'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import Chart from 'react-apexcharts'

export default function ProcessingOrdersCard() {
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
      labels: ['Assigned to Warehouse', 'Ready to Ship', 'Searching for Driver', 'Picked Up', 'Shipment In Progress']
    },
    series: [9, 29, 41, 50, 395]
  }
  return (
    <Card className='h-full pb-4'>
      <CardContent className='h-full'>
        <Typography className='mb-3'>Processing Orders</Typography>
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
      </CardContent>
    </Card>
  )
}
