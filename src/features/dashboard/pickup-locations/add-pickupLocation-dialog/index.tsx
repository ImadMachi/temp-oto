'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'

// Component Imports
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  Tab,
  Typography
} from '@mui/material'
import CustomTextField from '@/@core/components/mui/TextField'
import ManualAddress from './ManualAddress'
import MapSelection from './MapSelection'

export type LocationDataType = {
  label: string
  useShortAddress: boolean
  address: string
  addressLine: string
  city: string
  state: string
  country: string
  zipCode: string
  shortAddresCode: string
  coords: {
    lat: number
    lng: number
  }
}

const initialData: LocationDataType = {
  label: '',
  useShortAddress: false,
  address: '',
  addressLine: '',
  city: '',
  state: '',
  country: '',
  zipCode: '',
  shortAddresCode: '',
  coords: {
    lat: 0,
    lng: 0
  }
}

type AddLocationDialogProps = {
  open: boolean
  setOpen: (open: boolean) => void
}
const AddLocationDialog = ({ open, setOpen }: AddLocationDialogProps) => {
  // States
  const [locationData, setLocationData] = useState<LocationDataType>(initialData)

  // Methods
  const handleClose = () => {
    setOpen(false)
    setLocationData(initialData)
  }

  const [addressAccordionExpanded, setAddressAccordionExpanded] = useState<{ [key: string]: boolean }>({
    manual: false,
    map: false
  })

  const handleAddressAccordionExpanded = (panel: string) => {
    setAddressAccordionExpanded({
      ...addressAccordionExpanded,
      manual: false,
      map: false,
      [panel]: !addressAccordionExpanded[panel]
    })
  }

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      maxWidth='sm'
      scroll='body'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogTitle variant='h4' className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        Add New Location
      </DialogTitle>
      <DialogContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='Label'
                placeholder=''
                value={locationData.label}
                onChange={e => setLocationData({ ...locationData, label: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: -2 }}>
              <Typography variant='h5' color='secondary'>
                Location Address
              </Typography>
            </Grid>
          </Grid>
          <Accordion
            expanded={addressAccordionExpanded.manual}
            onChange={() => handleAddressAccordionExpanded('manual')}
            className='mt-4'
          >
            <AccordionSummary id='panel-header-1' aria-controls='panel-content-1'>
              <Typography>Manual Entry</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ManualAddress locationData={locationData} setLocationData={setLocationData} />
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={addressAccordionExpanded.map} onChange={() => handleAddressAccordionExpanded('map')}>
            <AccordionSummary id='panel-header-2' aria-controls='panel-content-2'>
              <Typography>Map Selection</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <MapSelection locationData={locationData} setLocationData={setLocationData} />
              <ManualAddress locationData={locationData} setLocationData={setLocationData} isMapSelection={true} />
            </AccordionDetails>
          </Accordion>
        </form>
      </DialogContent>
      <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
        <Button variant='contained' endIcon={<i className='tabler-chevron-right' />}>
          Submit
        </Button>
        <Button variant='tonal' color='secondary' type='reset' onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddLocationDialog
