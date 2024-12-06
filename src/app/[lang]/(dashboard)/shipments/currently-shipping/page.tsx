import CurrentlyShippingList from '@/features/dashboard/shipments/currently-shipping/CurrentlyShippingList'
import { TabPanel } from '@mui/lab'

const CurrentlyShippingPage = async () => {
  return (
    <TabPanel value='currently-shipping'>
      <CurrentlyShippingList />
    </TabPanel>
  )
}

export default CurrentlyShippingPage
