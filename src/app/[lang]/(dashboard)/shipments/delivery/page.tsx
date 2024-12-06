import DeliveryList from '@/features/dashboard/shipments/delivery/DeliveryList'
import { TabPanel } from '@mui/lab'

const DeliveryListPage = async () => {
  return (
    <TabPanel value='delivery'>
      <DeliveryList />
    </TabPanel>
  )
}

export default DeliveryListPage
