'use client'

import SystemLogTabsNav from '@/features/dashboard/system-logs/SystemLogTabsNav'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <SystemLogTabsNav>{children}</SystemLogTabsNav>
}

export default Layout
