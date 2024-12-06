'use client'

import { TabContext, TabList } from '@mui/lab'
import { Tab, Typography } from '@mui/material'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

export default function ShippingPartnersTabsNav({ children }: { children: React.ReactNode }) {
  // Hooks
  const params = useParams()
  const { lang: locale } = params
  const tabValue = usePathname().split('/').at(-1) || 'list'

  return (
    <TabContext value={tabValue}>
      <Typography variant='h3' className='flex items-center font-semibold gap-2 mb-6'>
        <i className='tabler-truck text-3xl'></i> <span>Shipping Partners</span>
      </Typography>
      <TabList aria-label='nav tabs shipping partners'>
        <Tab value='list' component={Link} label='Partners' href={`/${locale}/shipping-partners/list`} />
        <Tab value='connected' component={Link} label='Connected' href={`/${locale}/shipping-partners/connected`} />
      </TabList>
      {children}
    </TabContext>
  )
}
