'use client'

import type { ChartConfig } from '@/types/apexchartsTypes'
import { Card, CardContent, Typography } from '@mui/material'
import Chart from 'react-apexcharts'

const assignedData = [
  { x: '2023-01-01', y: 3 },
  { x: '2023-01-16', y: 1 },
  { x: '2023-01-31', y: 5 },
  { x: '2023-02-15', y: 5 },
  { x: '2023-03-02', y: 5 },
  { x: '2023-03-17', y: 5 },
  { x: '2023-04-01', y: 6 },
  { x: '2023-04-16', y: 9 },
  { x: '2023-05-01', y: 8 },
  { x: '2023-05-16', y: 10 },
  { x: '2023-05-31', y: 13 },
  { x: '2023-06-15', y: 11 },
  { x: '2023-06-30', y: 13 },
  { x: '2023-07-15', y: 13 },
  { x: '2023-07-30', y: 14 },
  { x: '2023-08-14', y: 17 },
  { x: '2023-08-29', y: 20 },
  { x: '2023-09-13', y: 21 },
  { x: '2023-09-28', y: 18 },
  { x: '2023-10-13', y: 19 },
  { x: '2023-10-28', y: 23 },
  { x: '2023-11-12', y: 21 },
  { x: '2023-11-27', y: 24 },
  { x: '2023-12-12', y: 26 },
  { x: '2023-12-27', y: 27 },
  { x: '2024-01-11', y: 25 },
  { x: '2024-01-26', y: 26 },
  { x: '2024-02-10', y: 30 },
  { x: '2024-02-25', y: 28 },
  { x: '2024-03-11', y: 30 },
  { x: '2024-03-26', y: 30 },
  { x: '2024-04-10', y: 31 },
  { x: '2024-04-25', y: 35 },
  { x: '2024-05-10', y: 36 },
  { x: '2024-05-25', y: 34 },
  { x: '2024-06-09', y: 35 },
  { x: '2024-06-24', y: 40 },
  { x: '2024-07-09', y: 39 },
  { x: '2024-07-24', y: 39 },
  { x: '2024-08-08', y: 43 },
  { x: '2024-08-23', y: 40 },
  { x: '2024-09-07', y: 43 },
  { x: '2024-09-22', y: 46 },
  { x: '2024-10-07', y: 43 },
  { x: '2024-10-22', y: 44 },
  { x: '2024-11-06', y: 46 },
  { x: '2024-11-21', y: 47 },
  { x: '2024-12-06', y: 47 },
  { x: '2024-12-21', y: 48 }
]

const fulfilledData = [
  { x: '2023-01-01', y: 3 },
  { x: '2023-01-16', y: 1 },
  { x: '2023-01-31', y: 5 },
  { x: '2023-02-15', y: 4 }, // lower
  { x: '2023-03-02', y: 6 },
  { x: '2023-03-17', y: 7 },
  { x: '2023-04-01', y: 6 }, // lower
  { x: '2023-04-16', y: 9 },
  { x: '2023-05-01', y: 8 }, // lower
  { x: '2023-05-16', y: 10 },
  { x: '2023-05-31', y: 13 },
  { x: '2023-06-15', y: 11 }, // lower
  { x: '2023-06-30', y: 13 },
  { x: '2023-07-15', y: 14 },
  { x: '2023-07-30', y: 13 }, // lower
  { x: '2023-08-14', y: 17 },
  { x: '2023-08-29', y: 16 }, // lower
  { x: '2023-09-13', y: 21 },
  { x: '2023-09-28', y: 18 }, // lower
  { x: '2023-10-13', y: 19 },
  { x: '2023-10-28', y: 23 },
  { x: '2023-11-12', y: 21 },
  { x: '2023-11-27', y: 24 },
  { x: '2023-12-12', y: 26 },
  { x: '2023-12-27', y: 27 },
  { x: '2024-01-11', y: 25 }, // lower
  { x: '2024-01-26', y: 26 },
  { x: '2024-02-10', y: 30 },
  { x: '2024-02-25', y: 28 }, // lower
  { x: '2024-03-11', y: 30 },
  { x: '2024-03-26', y: 30 },
  { x: '2024-04-10', y: 31 },
  { x: '2024-04-25', y: 35 },
  { x: '2024-05-10', y: 36 },
  { x: '2024-05-25', y: 34 }, // lower
  { x: '2024-06-09', y: 35 },
  { x: '2024-06-24', y: 40 },
  { x: '2024-07-09', y: 39 }, // lower
  { x: '2024-07-24', y: 39 },
  { x: '2024-08-08', y: 43 },
  { x: '2024-08-23', y: 40 }, // lower
  { x: '2024-09-07', y: 43 },
  { x: '2024-09-22', y: 46 },
  { x: '2024-10-07', y: 45 }, // lower
  { x: '2024-10-22', y: 44 }, // lower
  { x: '2024-11-06', y: 46 },
  { x: '2024-11-21', y: 47 },
  { x: '2024-12-06', y: 47 },
  { x: '2024-12-21', y: 48 }
]

export default function AssignedVsFulfilledCard() {
  const chartConfig: ChartConfig = {
    series: [
      {
        name: 'Assigned Orders',
        data: assignedData
      },
      {
        name: 'Fulfilled Orders',
        data: fulfilledData
      }
    ],
    options: {
      chart: {
        type: 'line',
        stacked: false,
        height: 350,

        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: 'zoom'
        }
      },
      stroke: {
        width: 2
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0
      },
      yaxis: {
        title: {
          text: 'Orders'
        }
      },
      xaxis: {
        type: 'datetime'
      }
    }
  }

  return (
    <Card className='h-full'>
      <CardContent>
        <Typography className='mb-3'>Current Orders</Typography>
        <Chart
          options={chartConfig.options}
          series={chartConfig.series}
          type={chartConfig.options.chart?.type}
          height={chartConfig.options.chart?.height}
        />
      </CardContent>
    </Card>
  )
}
