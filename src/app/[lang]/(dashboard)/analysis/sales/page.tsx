import Sales from '@/features/dashboard/analysis/sales/Sales'
import { TabPanel } from '@mui/lab'

export default function AnalysisOverviewPage() {
  return (
    <TabPanel value='sales'>
      <Sales />
    </TabPanel>
  )
}
