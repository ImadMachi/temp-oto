'use client'

import { TabContext, TabList } from '@mui/lab'
import { Tab } from '@mui/material'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

export default function SystemLogTabsNav({ children }: { children: React.ReactNode }) {
  // Hooks
  const params = useParams()
  const { lang: locale } = params
  const tabValue = usePathname().split('/').at(-1) || 'shipment-error-logs'

  return (
    <TabContext value={tabValue}>
      <TabList aria-label='nav tabs system logs'>
        <Tab
          value='shipment-error-logs'
          component={Link}
          label='Shipment Error Logs'
          href={`/${locale}/system-logs/shipment-error-logs`}
        />
        <Tab
          value='webhook-error-logs'
          component={Link}
          label='Webhook Error Logs'
          href={`/${locale}/system-logs/webhook-error-logs`}
        />
        <Tab
          value='pickup-error-logs'
          component={Link}
          label='Pickup Error Logs'
          href={`/${locale}/system-logs/pickup-error-logs`}
        />
      </TabList>
      {children}
    </TabContext>
  )
}
