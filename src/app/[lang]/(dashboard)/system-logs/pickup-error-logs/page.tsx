import PickupErrorLogsList from '@/features/dashboard/system-logs/pickup-error-logs/PickupErrorLogsList'
import { TabPanel } from '@mui/lab'

const PickupErrorLogListPage = async () => {
  return (
    <TabPanel value='pickup-error-logs'>
      <PickupErrorLogsList />
    </TabPanel>
  )
}

export default PickupErrorLogListPage
