'use client'

import { TabContext, TabList } from '@mui/lab'
import { Tab, Typography } from '@mui/material'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

export default function SubscriptionTabsNav({ children }: { children: React.ReactNode }) {
  // Hooks
  const params = useParams()
  const { lang: locale } = params
  const tabValue = usePathname().split('/').at(-1) || 'plan&billing'

  return (
    <TabContext value={tabValue}>
      <Typography variant='h3' className='flex items-center font-semibold gap-2 mb-6'>
        <i className='tabler-chart-line text-3xl'></i> <span>Subscription Management</span>
      </Typography>
      <TabList aria-label='nav tabs shipping partners'>
        <Tab
          value='plan-billing'
          component={Link}
          label='Plan & Billing'
          href={`/${locale}/subscription-management/plan-billing`}
        />
        <Tab value='payments' component={Link} label='Payments' href={`/${locale}/subscription-management/payments`} />
      </TabList>
      {children}
    </TabContext>
  )
}
