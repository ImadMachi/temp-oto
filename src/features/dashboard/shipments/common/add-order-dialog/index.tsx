'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'

// Component Imports
import RecipientTab from './RecipientTab'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Tab } from '@mui/material'
import OrderDetailsTab from './OrderDetailsTab'

export type ProductDataType = {
  index: number
  id: number
  name: string
  sku: string
  quantity: number
  price: number
  tax: number
  isEdit: boolean
}

export type BoxDataType = {
  index: number
  name: string
  id: number
  length: number
  width: number
  height: number
  weight: number
}

export type OrderDataType = {
  firstName?: string
  lastName?: string
  userName?: string
  email?: string
  status?: string
  taxId?: string
  phoneNumber?: string
  language?: string[]
  addressLine?: string
  country?: string
  state?: string
  city?: string
  zipCode?: string
  shortAddresCode?: string
  useShortAddress?: boolean
  orderNumber?: string
  orderDate: Date | null
  paymentMethod?: string
  orderGrandTotal: number | null
  currency?: string
  wareHouse?: string
  products: ProductDataType[]
  boxes: BoxDataType[]
}

const initialData: OrderDataType = {
  firstName: '',
  lastName: '',
  userName: '',
  email: '',
  status: '',
  taxId: '',
  phoneNumber: '',
  language: ['English'],
  addressLine: '',
  country: 'Saudi Arabia',
  state: 'Riyadh',
  city: 'Riyadh',
  zipCode: '',
  shortAddresCode: '',
  useShortAddress: false,
  orderNumber: '',
  orderDate: new Date(),
  paymentMethod: 'Paid',
  orderGrandTotal: null,
  currency: 'SAR',
  products: [],
  boxes: []
}

type AddOrderDialogProps = {
  open: boolean
  setOpen: (open: boolean) => void
}
const AddOrderDialog = ({ open, setOpen }: AddOrderDialogProps) => {
  // States
  const [orderData, setOrderData] = useState<OrderDataType>(initialData)
  const [tabValue, setTabValue] = useState('recipient-info')

  const handleClose = () => {
    setOpen(false)
    setOrderData(initialData)
    setTabValue('recipient-info')
  }

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      maxWidth='md'
      scroll='body'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogTitle variant='h4' className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        Add New Order
      </DialogTitle>
      <form onSubmit={e => e.preventDefault()}>
        <TabContext value={tabValue}>
          <TabList centered aria-label='nav tabs example'>
            <Tab
              value='recipient-info'
              component='span'
              label='Recipient Information'
              onClick={() => setTabValue('recipient-info')}
            />
            <Tab
              value='order-details'
              component='span'
              label='Order Information'
              onClick={() => setTabValue('order-details')}
            />
          </TabList>
          <TabPanel value='recipient-info'>
            <RecipientTab
              orderData={orderData}
              setOrderData={setOrderData}
              handleClose={handleClose}
              setTabValue={setTabValue}
            />
          </TabPanel>
          <TabPanel value='order-details'>
            <OrderDetailsTab orderData={orderData} setOrderData={setOrderData} handleClose={handleClose} />
          </TabPanel>
        </TabContext>
      </form>
    </Dialog>
  )
}

export default AddOrderDialog
