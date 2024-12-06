import { Overview } from '@/features/dashboard/analysis'
import { TabPanel } from '@mui/lab'

export default function AnalysisOverviewPage() {
  return (
    <TabPanel value='overview'>
      <Overview />
    </TabPanel>
  )
}
