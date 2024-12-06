'use client'

import type { ChartConfig } from '@/types/apexchartsTypes'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import Chart from 'react-apexcharts'

export default function ShipmentTypesCard() {
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
      labels: ['Standard', 'Express', 'Economy']
    },
    series: [8456, 15325, 387]
  }
  return (
    <Card className='h-full pb-4'>
      <CardContent className='h-full'>
        <Typography className='mb-3'>Shipment Types</Typography>
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
