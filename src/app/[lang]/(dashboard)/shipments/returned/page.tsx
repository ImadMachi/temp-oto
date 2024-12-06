import ReturnedList from '@/features/dashboard/shipments/returned/ReturnedList'
import { TabPanel } from '@mui/lab'

const ReturnedListPage = async () => {
  return (
    <TabPanel value='returned'>
      <ReturnedList />
    </TabPanel>
  )
}

export default ReturnedListPage
