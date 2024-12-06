import CustomTextField from '@/@core/components/mui/TextField'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Grid,
  MenuItem,
  Switch,
  Typography
} from '@mui/material'
import type { OrderDataType } from '.'
import { useState } from 'react'
import ManualAddress from './ManualAddress'
import MapSelection from './MapSelection'

interface RecipientTabProps {
  orderData: OrderDataType
  setOrderData: React.Dispatch<React.SetStateAction<OrderDataType>>
  handleClose: () => void
  setTabValue: React.Dispatch<React.SetStateAction<string>>
}
export default function RecipientTab({ orderData, setOrderData, handleClose, setTabValue }: RecipientTabProps) {
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
    <>
      <DialogContent className='overflow-visible pbs-0 sm:pli-16 '>
        <Typography variant='h5' color='secondary' className='mb-3'>
          Recipient Information
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label='First Name'
              placeholder='John'
              value={orderData.firstName}
              onChange={e => setOrderData({ ...orderData, firstName: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label='Last Name'
              placeholder='Doe'
              value={orderData.lastName}
              onChange={e => setOrderData({ ...orderData, lastName: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label='Email'
              placeholder='johnDoe@email.com'
              value={orderData.email}
              onChange={e => setOrderData({ ...orderData, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label='Phone Number'
              placeholder='+ 966 123 4567'
              value={orderData.phoneNumber}
              onChange={e => setOrderData({ ...orderData, phoneNumber: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sx={{ mb: -2 }}>
            <Typography variant='h5' color='secondary'>
              Recipient Address
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
            <ManualAddress orderData={orderData} setOrderData={setOrderData} />
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={addressAccordionExpanded.map} onChange={() => handleAddressAccordionExpanded('map')}>
          <AccordionSummary id='panel-header-2' aria-controls='panel-content-2'>
            <Typography>Map Selection</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <MapSelection orderData={orderData} setOrderData={setOrderData} />
            <ManualAddress orderData={orderData} setOrderData={setOrderData} isMapSelection={true} />
          </AccordionDetails>
        </Accordion>
      </DialogContent>
      <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
        <Button
          onClick={() => setTabValue('order-details')}
          variant='contained'
          endIcon={<i className='tabler-chevron-right' />}
        >
          Continue
        </Button>
        <Button variant='tonal' color='secondary' type='reset' onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </>
  )
}
