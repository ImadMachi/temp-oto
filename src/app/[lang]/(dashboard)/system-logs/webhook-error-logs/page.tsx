import WebhookErrorLogsList from '@/features/dashboard/system-logs/webhook-error-logs/WebhookErrorLogsList'
import { TabPanel } from '@mui/lab'

const WebhookErrorLogListPage = async () => {
  return (
    <TabPanel value='webhook-error-logs'>
      <WebhookErrorLogsList />
    </TabPanel>
  )
}

export default WebhookErrorLogListPage
