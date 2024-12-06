import SalesChannelsTabsNav from '@/features/dashboard/sales-channels/SalesChannelsTabsNav'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SalesChannelsTabsNav>{children}</SalesChannelsTabsNav>
}
