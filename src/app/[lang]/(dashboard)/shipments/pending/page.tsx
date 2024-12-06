import PendingOrderList from '@/features/dashboard/shipments/pending/PendingOrderList'
import { TabPanel } from '@mui/lab'

const PendingOrderListPage = async () => {
  return (
    <TabPanel value='pending'>
      <PendingOrderList />
    </TabPanel>
  )
}

export default PendingOrderListPage
