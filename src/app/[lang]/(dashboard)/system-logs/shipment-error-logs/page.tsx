import ShipmentErrorLogsList from '@/features/dashboard/system-logs/shipment-error-logs/ShipmentErrorLogsList'
import { TabPanel } from '@mui/lab'

const ShipmentErrorLogsListPage = async () => {
  return (
    <TabPanel value='shipment-error-logs'>
      <ShipmentErrorLogsList />
    </TabPanel>
  )
}

export default ShipmentErrorLogsListPage
