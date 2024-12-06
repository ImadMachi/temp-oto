import { Payments } from '@/features/dashboard/subscription-management'
import { TabPanel } from '@mui/lab'

export default function PaymentsPage() {
  return (
    <TabPanel value='payments'>
      <Payments />
    </TabPanel>
  )
}
