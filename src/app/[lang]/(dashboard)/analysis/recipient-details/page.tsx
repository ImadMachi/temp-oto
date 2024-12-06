import RecipientDetails from '@/features/dashboard/analysis/recipient-details/RecipientDetails'
import { TabPanel } from '@mui/lab'

export default function AnalysisRecipientDetailsPage() {
  return (
    <TabPanel value='recipient-details'>
      <RecipientDetails />
    </TabPanel>
  )
}
