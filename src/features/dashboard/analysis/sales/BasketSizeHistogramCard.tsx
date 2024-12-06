'use client'

import type { ChartConfig } from '@/types/apexchartsTypes'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import Chart from 'react-apexcharts'

const data = [
  { x: new Date('2022-01-01').getTime(), y: 150 },
  { x: new Date('2022-02-01').getTime(), y: 170 },
  { x: new Date('2022-03-01').getTime(), y: 130 },
  { x: new Date('2022-04-01').getTime(), y: 200 },
  { x: new Date('2022-05-01').getTime(), y: 210 },
  { x: new Date('2022-06-01').getTime(), y: 180 },
  { x: new Date('2022-07-01').getTime(), y: 230 },
  { x: new Date('2022-08-01').getTime(), y: 170 },
  { x: new Date('2022-09-01').getTime(), y: 250 },
  { x: new Date('2022-10-01').getTime(), y: 200 },
  { x: new Date('2022-11-01').getTime(), y: 220 },
  { x: new Date('2022-12-01').getTime(), y: 190 },
  { x: new Date('2023-01-01').getTime(), y: 260 },
  { x: new Date('2023-02-01').getTime(), y: 240 },
  { x: new Date('2023-03-01').getTime(), y: 210 },
  { x: new Date('2023-04-01').getTime(), y: 270 },
  { x: new Date('2023-05-01').getTime(), y: 280 },
  { x: new Date('2023-06-01').getTime(), y: 230 },
  { x: new Date('2023-07-01').getTime(), y: 290 },
  { x: new Date('2023-08-01').getTime(), y: 250 },
  { x: new Date('2023-09-01').getTime(), y: 300 },
  { x: new Date('2023-10-01').getTime(), y: 270 },
  { x: new Date('2023-11-01').getTime(), y: 280 },
  { x: new Date('2023-12-01').getTime(), y: 250 },
  { x: new Date('2024-01-01').getTime(), y: 300 },
  { x: new Date('2024-02-01').getTime(), y: 260 },
  { x: new Date('2024-03-01').getTime(), y: 230 },
  { x: new Date('2024-04-01').getTime(), y: 270 },
  { x: new Date('2024-05-01').getTime(), y: 290 },
  { x: new Date('2024-06-01').getTime(), y: 250 }
]

export default function BasketSizeHistogramCard() {
  const chartConfig: ChartConfig = {
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '100%',
          distributed: true
        }
      },

      dataLabels: {
        enabled: false
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy'
        }
      },
      legend: {
        show: false
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        title: {
          text: 'Average Basket Size (Monthly)'
        }
      },
      colors: ['#008FFB'],
      fill: {
        opacity: 1
      }
    },
    series: [
      {
        name: 'Orders',
        data
      }
    ]
  }
  return (
    <Card className='h-full pb-4'>
      <CardContent className='h-full'>
        <Typography className='mb-3'>Average Basket Size (Monthly)</Typography>
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
