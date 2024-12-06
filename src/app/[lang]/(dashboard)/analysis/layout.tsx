import AnalysisTabsNav from '@/features/dashboard/analysis/AnalysisTabsNav'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AnalysisTabsNav>{children}</AnalysisTabsNav>
}
