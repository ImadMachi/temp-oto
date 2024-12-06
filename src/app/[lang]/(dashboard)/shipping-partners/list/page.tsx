import ShippingPartnersList from '@/features/dashboard/shipping-partners/list/ShippingPartnersList'
import { TabPanel } from '@mui/lab'

export default function ShippingPartnersPage() {
  return (
    <TabPanel value='list'>
      <ShippingPartnersList />
    </TabPanel>
  )
}
