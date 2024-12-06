import { SubscriptionTabsNav } from '@/features/dashboard/subscription-management'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SubscriptionTabsNav>{children}</SubscriptionTabsNav>
}
