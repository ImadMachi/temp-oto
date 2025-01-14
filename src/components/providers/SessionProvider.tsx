'use client'

import type { Session } from 'next-auth'
import { SessionProvider as DefaultSessionProvider } from 'next-auth/react'

export default function SessionProvider({ children, session }: { children: React.ReactNode; session: Session | null }) {
  return <DefaultSessionProvider session={session}>{children}</DefaultSessionProvider>
}
