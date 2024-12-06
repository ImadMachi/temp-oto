'use client'

import { TabContext, TabList } from '@mui/lab'
import { Tab } from '@mui/material'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

export default function ShipmentTabsNav({ children }: { children: React.ReactNode }) {
  // Hooks
  const params = useParams()
  const { lang: locale } = params
  const tabValue = usePathname().split('/').at(-1) || 'pending'

  return (
    <TabContext value={tabValue}>
      <TabList aria-label='nav tabs shipment'>
        <Tab value='pending' component={Link} label='Pending Orders' href={`/${locale}/shipments/pending`} />
        <Tab value='picking' component={Link} label='Picking' href={`/${locale}/shipments/picking`} />
        <Tab
          value='currently-shipping'
          component={Link}
          label='Currently Shipping'
          href={`/${locale}/shipments/currently-shipping`}
        />
        <Tab
          value='shipment-on-hold'
          component={Link}
          label='Shipment On Hold'
          href={`/${locale}/shipments/shipment-on-hold`}
        />
        <Tab value='delivery' component={Link} label='Delivery' href={`/${locale}/shipments/delivery`} />
        <Tab value='returned' component={Link} label='Returned' href={`/${locale}/shipments/returned`} />
        <Tab value='canceled' component={Link} label='Canceled Orders' href={`/${locale}/shipments/canceled`} />
      </TabList>
      {children}
    </TabContext>
  )
}
