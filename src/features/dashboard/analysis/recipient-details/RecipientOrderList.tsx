'use client'
// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import { useEffect, useState } from 'react'
import type { OrderType } from '@/types/orderTypes'
import { getOrders } from '@/app/server/actions'
import RecipientOrderTable from './RecipientOrderTable'

const visibleColumns: (keyof OrderType | 'action')[] = [
  'id',
  'date',
  'status',
  'customerName',
  'shipmentNumber',
  'deliveryCompany',
  'deliveryDate',
  'trackingNumber'
]

const RecipientOrderList = () => {
  const [orders, setOrders] = useState<OrderType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const orders = await getOrders()
      setOrders(orders)
      setIsLoading(false)
    })()
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} className='mt-4'>
        <RecipientOrderTable data={orders} setData={setOrders} isLoading={isLoading} visibleColumns={visibleColumns} />
      </Grid>
    </Grid>
  )
}

export default RecipientOrderList
