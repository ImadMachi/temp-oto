'use client'

import CustomTextField from '@/@core/components/mui/TextField'
import { Card, Grid, MenuItem } from '@mui/material'
import { useState } from 'react'
import { format } from 'date-fns'
import RangeDateDialog from '../RangeDateDialog'

export default function OverviewFilter() {
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

  const handleCloseRangeDialog = () => {
    setRangeDialogOpen(false)
  }

  return (
    <Grid container spacing={6}>
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
