import SalesChannelsList from '@/features/dashboard/sales-channels/list/SalesChannelsList'
import { TabPanel } from '@mui/lab'

export default function SalesChannelsPage() {
  return (
    <TabPanel value='list'>
      <SalesChannelsList />
    </TabPanel>
  )
}
