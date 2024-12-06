'use client'

import CustomAutocomplete from '@/@core/components/mui/Autocomplete'
import CustomTextField from '@/@core/components/mui/TextField'
import { Card, Grid, MenuItem } from '@mui/material'
import { useState, type SyntheticEvent } from 'react'
import { format } from 'date-fns'
import RangeDateDialog from '../RangeDateDialog'

export interface DeliveryCompanyType {
  id: number
  name: string
  avgDeliveryTime: string
  avgPickupTime: string
  avgTransitTime: string
  transitRate: number
  deliveryRate: number
  returnRate: number
  serviceLevel: number
  numberOfOrders: number
  allocation: number
}

export const deliveryCompanies: DeliveryCompanyType[] = [
  {
    id: 1,
    name: 'Speedy Express',
    avgDeliveryTime: '2d 4h',
    avgPickupTime: '1d 3h',
    avgTransitTime: '1d 6h',
    transitRate: 90,
    deliveryRate: 92,
    returnRate: 5,
    serviceLevel: 85,
    numberOfOrders: 1200,
    allocation: 30
  },
  {
    id: 2,
    name: 'QuickShip Logistics',
    avgDeliveryTime: '3d 2h',
    avgPickupTime: '1d 8h',
    avgTransitTime: '2d 1h',
    transitRate: 88,
    deliveryRate: 90,
    returnRate: 7,
    serviceLevel: 87,
    numberOfOrders: 850,
    allocation: 25
  },
  {
    id: 3,
    name: 'Prime Courier',
    avgDeliveryTime: '1d 5h',
    avgPickupTime: '0d 12h',
    avgTransitTime: '1d 3h',
    transitRate: 93,
    deliveryRate: 95,
    returnRate: 3,
    serviceLevel: 90,
    numberOfOrders: 1450,
    allocation: 35
  },
  {
    id: 4,
    name: 'ShipFast Global',
    avgDeliveryTime: '4d 1h',
    avgPickupTime: '2d 5h',
    avgTransitTime: '3d 8h',
    transitRate: 85,
    deliveryRate: 88,
    returnRate: 8,
    serviceLevel: 80,
    numberOfOrders: 1000,
    allocation: 28
  },
  {
    id: 5,
    name: 'NextDay Logistics',
    avgDeliveryTime: '0d 18h',
    avgPickupTime: '0d 8h',
    avgTransitTime: '0d 14h',
    transitRate: 95,
    deliveryRate: 96,
    returnRate: 2,
    serviceLevel: 93,
    numberOfOrders: 1600,
    allocation: 40
  }
]

interface DeliveryCompanyFilterProps {
  deliveryCompany: DeliveryCompanyType | null
  setDeliveryCompany: (deliveryCompany: DeliveryCompanyType | null) => void
}
export default function DeliveryCompanyFilter({ deliveryCompany, setDeliveryCompany }: DeliveryCompanyFilterProps) {
  // States
  const [selectedRange, setSelectedRange] = useState<'today' | 'last7Days' | 'lastMonth' | 'custom'>('today')
  const [customDates, setCustomDates] = useState<{ start: Date | undefined; end: Date | undefined }>({
    start: undefined,
    end: undefined
  })
  const [rangeDialogOpen, setRangeDialogOpen] = useState(false)

  // Methods
  const handleRangeChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = e.target.value as 'today' | 'last7Days' | 'lastMonth' | 'custom'
    setSelectedRange(value)

    if (value === 'custom') {
      setRangeDialogOpen(true)
    } else {
      setCustomDates({ start: undefined, end: undefined })
    }
  }

  const handleChange = (e: SyntheticEvent, newValue: DeliveryCompanyType | null) => {
    setDeliveryCompany(newValue)
  }

  const handleCloseRangeDialog = () => {
    setRangeDialogOpen(false)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}>
        <Card className='mb-6 inline-block w-full'>
          <CustomAutocomplete
            fullWidth
            options={deliveryCompanies}
            id='autocomplete-deliveryCompany'
            getOptionKey={option => option.id.toString()}
            getOptionLabel={option => option.name}
            renderInput={params => <CustomTextField placeholder='Select Company' {...params} />}
            value={deliveryCompany}
            onChange={handleChange}
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4}>
        <Card className='mb-6 inline-block w-full'>
          <CustomTextField select fullWidth value={selectedRange} onChange={handleRangeChange}>
            <MenuItem value='today'>Today</MenuItem>
            <MenuItem value='last7Days'>Last 7 Days</MenuItem>
            <MenuItem value='lastMonth'>Last Month</MenuItem>
            <MenuItem value='custom' onClick={setRangeDialogOpen.bind(null, true)}>
              {!!customDates.start && !!customDates.end
                ? `${format(customDates.start, 'MM/dd/yyyy')} - ${format(customDates.end, 'MM/dd/yyyy')}`
                : 'Custom'}
            </MenuItem>
          </CustomTextField>
        </Card>
      </Grid>
      {rangeDialogOpen && (
        <RangeDateDialog
          open={rangeDialogOpen}
          handleClose={handleCloseRangeDialog}
          customDates={customDates}
          setCustomDates={setCustomDates}
        />
      )}
    </Grid>
  )
}
