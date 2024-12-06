import ConnectedList from '@/features/dashboard/sales-channels/connected/ConnectedList'
import { TabPanel } from '@mui/lab'

export default function ConnectedListPage() {
  return (
    <TabPanel value='connected'>
      <ConnectedList />
    </TabPanel>
  )
}
