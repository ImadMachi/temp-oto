import { DeliveryCompany } from '@/features/dashboard/analysis'
import { TabPanel } from '@mui/lab'

export default function AnalysisDeliveryCompanyPage() {
  return (
    <TabPanel value='delivery-company'>
      <DeliveryCompany />
    </TabPanel>
  )
}
