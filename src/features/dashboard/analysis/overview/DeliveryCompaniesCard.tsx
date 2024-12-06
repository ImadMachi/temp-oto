'use client'

import type { ChartConfig } from '@/types/apexchartsTypes'
import { Card, CardContent, Typography } from '@mui/material'
import Chart from 'react-apexcharts'

export default function DeliveryCompaniesCard() {
  const chartConfig: ChartConfig = {
    options: {
      chart: {
        type: 'bar',
        height: 300
      },
      yaxis: {
        title: {
          text: 'Orders'
        }
      }
    },
    series: [
      {
        name: 'Orders',
        data: [
          {
            x: 'Aramex',
            y: 8905
          },
          {
            x: 'FedEx',
            y: 1501
          },
          {
            x: 'DHL',
            y: 215
          },
          {
            x: 'Naqel Express',
            y: 65
          },
          {
            x: 'UPS',
            y: 32
          }
        ]
      }
    ]
  }

  return (
    <Card className='h-full'>
      <CardContent>
        <Typography className='mb-3'>Delivery Companies</Typography>
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
