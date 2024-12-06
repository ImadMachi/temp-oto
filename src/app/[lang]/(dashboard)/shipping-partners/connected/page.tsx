import ConnectedList from '@/features/dashboard/shipping-partners/connected/ConnectedList'
import { TabPanel } from '@mui/lab'

export default function ConnectedListPage() {
  return (
    <TabPanel value='connected'>
      <ConnectedList />
    </TabPanel>
  )
}
