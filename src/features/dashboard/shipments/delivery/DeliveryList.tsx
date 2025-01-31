'use client'
// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import OrderListTable from '../common/table-view/OrderListTable'
import ViewTypeContext from '@/contexts/ViewTypeContext'
import { ViewTypeEnum } from '@/constants/layout-constants'
import MapViewList from '../common/map-view/MapViewList'
import { useContext, useEffect, useState } from 'react'
import type { OrderType } from '@/types/orderTypes'
import ActionMenu from './ActionMenu'
import { getOrders } from '@/app/server/actions'
import BulkAction from './BulkAction'
import StatisticCards from './StatisticCards'

const visibleColumns: (keyof OrderType | 'action')[] = [
  'id',
  'date',
  'status',
  'customerName',
  'shipmentNumber',
  'deliveryCompany',
  'deliveryDate',
  'trackingNumber',
  'action'
]

const DeliveryList = () => {
  const { viewType } = useContext(ViewTypeContext)
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
      <Grid item xs={12}>
        <StatisticCards />
      </Grid>
      <Grid item xs={12}>
        {viewType == ViewTypeEnum.LIST_VIEW && (
          <OrderListTable data={orders} setData={setOrders} isLoading={isLoading} visibleColumns={visibleColumns}>
            {{
              bulkAction: BulkAction,
              actionMenu: ActionMenu
            }}
          </OrderListTable>
        )}
        {viewType == ViewTypeEnum.MAP_VIEW && <MapViewList orders={orders} actionMenu={ActionMenu} />}
      </Grid>
    </Grid>
  )
}

export default DeliveryList
