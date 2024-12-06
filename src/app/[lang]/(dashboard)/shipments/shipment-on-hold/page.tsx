// Component Imports
import ShipmentOnHoldList from '@/features/dashboard/shipments/shipment-on-hold/ShipmentOnHoldList'
import { TabPanel } from '@mui/lab'

const ShipmentOnHoldPage = async () => {
  return (
    <TabPanel value='shipment-on-hold'>
      <ShipmentOnHoldList />
    </TabPanel>
  )
}

export default ShipmentOnHoldPage
