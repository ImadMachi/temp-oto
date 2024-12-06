import PickingList from '@/features/dashboard/shipments/picking/PickingList'
import { TabPanel } from '@mui/lab'

const PickingListPage = async () => {
  return (
    <TabPanel value='picking'>
      <PickingList />
    </TabPanel>
  )
}

export default PickingListPage
