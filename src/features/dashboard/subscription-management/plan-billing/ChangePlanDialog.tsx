'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'

// Component Imports
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Tab } from '@mui/material'
import SelectPlanTab from './SelectPlanTab'
import ConfirmPlanTab from './ConfirmPlanTab'
import SelectPaymentTab from './SelectPaymentTab'
import SelectCompletedTab from './SelectCompletedTab'

interface PlanDataType {}

const initialData: PlanDataType = {}

type ChangePlanDialogProps = {
  open: boolean
  setOpen: (open: boolean) => void
}
const ChangePlanDialog = ({ open, setOpen }: ChangePlanDialogProps) => {
  // States
  const [planData, setPlanData] = useState<PlanDataType>(initialData)
  const [tabValue, setTabValue] = useState('select-plan')

  const handleClose = () => {
    setOpen(false)
    setPlanData(initialData)
    setTabValue('select-plan')
  }

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      maxWidth='lg'
      scroll='body'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <form onSubmit={e => e.preventDefault()} className='pt-10'>
        <TabContext value={tabValue}>
          <TabList centered aria-label='nav tabs example'>
            <Tab value='select-plan' component='span' label='Select Plan' onClick={() => setTabValue('select-plan')} />
            <Tab
              value='confirm-plan'
              component='span'
              label='Confirm Plan'
              onClick={() => setTabValue('confirm-plan')}
            />
            <Tab
              value='select-payment'
              component='span'
              label='Select Payment'
              onClick={() => setTabValue('select-payment')}
            />
            <Tab
              value='select-completed'
              component='span'
              label='Completed'
              onClick={() => setTabValue('select-completed')}
            />
          </TabList>
          <TabPanel value='select-plan'>
            <SelectPlanTab setTabValue={setTabValue} handleClose={handleClose} />
          </TabPanel>
          <TabPanel value='confirm-plan'>
            <ConfirmPlanTab setTabValue={setTabValue} handleClose={handleClose} />
          </TabPanel>
          <TabPanel value='select-payment'>
            <SelectPaymentTab setTabValue={setTabValue} handleClose={handleClose} />
          </TabPanel>
          <TabPanel value='select-completed'>
            <SelectCompletedTab setTabValue={setTabValue} handleClose={handleClose} />
          </TabPanel>
        </TabContext>
      </form>
    </Dialog>
  )
}

export default ChangePlanDialog
