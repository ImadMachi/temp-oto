'use client'

import CustomAutocomplete from '@/@core/components/mui/Autocomplete'
import CustomTextField from '@/@core/components/mui/TextField'
import { Card, Grid, MenuItem } from '@mui/material'
import { useState, type SyntheticEvent } from 'react'
import type { TextFieldProps } from '@mui/material/TextField'
import { format } from 'date-fns'
import RangeDateDialog from '../RangeDateDialog'

export interface RecipientType {
  id: number
  name: string
  phone: string
}

export const recipients: RecipientType[] = [
  {
    id: 1,
    name: 'Ahmed Salem',
    phone: '0123456789'
  },
  {
    id: 2,
    name: 'Abdelrahman Mohamed',
    phone: '0125256764'
  },
  {
    id: 3,
    name: 'Ibrahim Kamal',
    phone: '5732189632'
  },
  {
    id: 4,
    name: 'Salman Ahmed',
    phone: '0123456789'
  }
]

interface RecipientFilterProps {
  recipient: RecipientType | null
  setRecipient: (recipient: RecipientType | null) => void
}
export default function RecipientFilter({ recipient, setRecipient }: RecipientFilterProps) {
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

  const handleChange = (e: SyntheticEvent, newValue: RecipientType | null) => {
    setRecipient(newValue)
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
            options={recipients}
            id='autocomplete-recipient'
            getOptionKey={option => option.id.toString()}
            getOptionLabel={option => option.name}
            renderInput={params => <CustomTextField placeholder='Select Recipient' {...params} />}
            value={recipient}
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
