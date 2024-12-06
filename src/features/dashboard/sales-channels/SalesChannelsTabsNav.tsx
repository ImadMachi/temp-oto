'use client'

import { TabContext, TabList } from '@mui/lab'
import { Tab, Typography } from '@mui/material'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

export default function SalesChannelsTabsNav({ children }: { children: React.ReactNode }) {
  // Hooks
  const params = useParams()
  const { lang: locale } = params
  const tabValue = usePathname().split('/').at(-1) || 'list'

  return (
    <TabContext value={tabValue}>
      <Typography variant='h3' className='flex items-center font-semibold gap-2 mb-6'>
        <i className='tabler-building-store text-3xl'></i> <span>Sales Channels</span>
      </Typography>
      <TabList aria-label='nav tabs sales channels'>
        <Tab value='list' component={Link} label='Sales channels' href={`/${locale}/sales-channels/list`} />
        <Tab value='connected' component={Link} label='Connected' href={`/${locale}/sales-channels/connected`} />
      </TabList>
      {children}
    </TabContext>
  )
}
