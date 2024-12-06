'use client'

import type { ChartConfig } from '@/types/apexchartsTypes'
import { Card, CardContent, Typography } from '@mui/material'
import { useState } from 'react'
import Chart from 'react-apexcharts'
import PendingPickupCard from './PendingPickupCard'
import PendingPreparationCard from './PendingPreparationCard'
import PendingDeliveryCard from './PendingDeliveryCard'

type BarType = 'preparation' | 'pickup' | 'delivery' | null

export default function PendingOrdersCard() {
  // States
  const [selectedBar, setSelectedBar] = useState<BarType>(null)

  // Vars
  const getBarChart = (bar: BarType) => {
    switch (bar) {
      case 'preparation':
        return <PendingPreparationCard handleClose={handleClose} />
      case 'pickup':
        return <PendingPickupCard handleClose={handleClose} />
      case 'delivery':
        return <PendingDeliveryCard handleClose={handleClose} />
      default:
        return null
    }
  }

  // Methods
  function handleClose() {
    setSelectedBar(null)
  }

  const chartConfig: ChartConfig = {
    options: {
      chart: {
        type: 'bar',
        height: 300,
        events: {
          click: (event: any, chartContext: any, options: any) => {
            setSelectedBar(options.config.series[0].data[options.dataPointIndex].meta)
          }
        }
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
            x: 'Pending Preparation',
            y: 150,
            meta: 'preparation'
          },
          {
            x: 'Pending Pickup',
            y: 67,
            meta: 'pickup'
          },
          {
            x: 'Pending Delivery',
            y: 390,
            meta: 'delivery'
          }
        ]
      }
    ]
  }

  return (
    <Card className='h-full'>
      <CardContent>
        {!selectedBar && (
          <>
            <Typography className='mb-3'>Pending Orders</Typography>
            <Chart
              options={chartConfig.options}
              series={chartConfig.series}
              type={chartConfig.options.chart?.type}
              height={chartConfig.options.chart?.height}
            />
          </>
        )}
        {getBarChart(selectedBar)}
      </CardContent>
    </Card>
  )
}
