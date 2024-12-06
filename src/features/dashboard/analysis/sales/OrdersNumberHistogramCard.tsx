'use client'

import type { ChartConfig } from '@/types/apexchartsTypes'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import Chart from 'react-apexcharts'

const data = [
  { x: new Date('2022-01-01').getTime(), y: 100 },
  { x: new Date('2022-02-01').getTime(), y: 150 },
  { x: new Date('2022-03-01').getTime(), y: 200 },
  { x: new Date('2022-04-01').getTime(), y: 400 }, // First peak
  { x: new Date('2022-05-01').getTime(), y: 300 },
  { x: new Date('2022-06-01').getTime(), y: 250 },
  { x: new Date('2022-07-01').getTime(), y: 200 }, // Slight dip
  { x: new Date('2022-08-01').getTime(), y: 250 },
  { x: new Date('2022-09-01').getTime(), y: 300 },
  { x: new Date('2022-10-01').getTime(), y: 350 },
  { x: new Date('2022-11-01').getTime(), y: 200 },
  { x: new Date('2022-12-01').getTime(), y: 100 },

  { x: new Date('2023-01-01').getTime(), y: 1000 }, // Second peak
  { x: new Date('2023-02-01').getTime(), y: 900 },
  { x: new Date('2023-03-01').getTime(), y: 850 },
  { x: new Date('2023-04-01').getTime(), y: 700 },
  { x: new Date('2023-05-01').getTime(), y: 600 },
  { x: new Date('2023-06-01').getTime(), y: 700 },
  { x: new Date('2023-07-01').getTime(), y: 800 },
  { x: new Date('2023-08-01').getTime(), y: 900 },
  { x: new Date('2023-09-01').getTime(), y: 1000 },
  { x: new Date('2023-10-01').getTime(), y: 1500 }, // Third peak
  { x: new Date('2023-11-01').getTime(), y: 1300 },
  { x: new Date('2023-12-01').getTime(), y: 1000 },

  { x: new Date('2024-01-01').getTime(), y: 800 }, // Steady decline
  { x: new Date('2024-02-01').getTime(), y: 700 },
  { x: new Date('2024-03-01').getTime(), y: 600 },
  { x: new Date('2024-04-01').getTime(), y: 500 },
  { x: new Date('2024-05-01').getTime(), y: 400 },
  { x: new Date('2024-06-01').getTime(), y: 300 } // Final point
]

export default function OrdersNumberHistogramCard() {
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
          text: 'Number of Orders'
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
        <Typography className='mb-3'>Orders Histogram</Typography>
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
