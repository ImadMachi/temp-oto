import { PlanBilling } from '@/features/dashboard/subscription-management'
import { TabPanel } from '@mui/lab'

export default function PlanBillingPage() {
  return (
    <TabPanel value='plan-billing'>
      <PlanBilling />
    </TabPanel>
  )
}
