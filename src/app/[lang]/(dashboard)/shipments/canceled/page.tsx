// Component Imports
import CanceledOrderList from '@/features/dashboard/shipments/canceled/CanceledOrderList'
import { TabPanel } from '@mui/lab'

const CanceledOrdersListPage = async () => {
  return (
    <TabPanel value='canceled'>
      <CanceledOrderList />
    </TabPanel>
  )
}

export default CanceledOrdersListPage
