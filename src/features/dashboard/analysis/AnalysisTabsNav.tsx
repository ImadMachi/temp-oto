'use client'

import { TabContext, TabList } from '@mui/lab'
import { Tab, Typography } from '@mui/material'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

export default function AnalysisTabsNav({ children }: { children: React.ReactNode }) {
  // Hooks
  const params = useParams()
  const { lang: locale } = params
  const tabValue = usePathname().split('/').at(-1) || 'overview'

  return (
    <TabContext value={tabValue}>
      <Typography variant='h3' className='flex items-center font-semibold gap-2 mb-6'>
        <i className='tabler-chart-line text-3xl'></i> <span>Analysis</span>
      </Typography>
      <TabList aria-label='nav tabs shipping partners'>
        <Tab value='overview' component={Link} label='Overview' href={`/${locale}/analysis/overview`} />
        <Tab
          value='delivery-company'
          component={Link}
          label='Delivery Company'
          href={`/${locale}/analysis/delivery-company`}
        />
        <Tab value='sales' component={Link} label='Sales' href={`/${locale}/analysis/sales`} />
        <Tab
          value='recipient-details'
          component={Link}
          label='Recipient Details'
          href={`/${locale}/analysis/recipient-details`}
        />
      </TabList>
      {children}
    </TabContext>
  )
}
