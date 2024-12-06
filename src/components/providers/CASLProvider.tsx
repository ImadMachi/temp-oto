'use client'
import { defineAbilityFor } from '@/configs/abilities'
import { AbilityContext } from '@/contexts/AbilityContext'
import type { Session } from 'next-auth'

interface CASLProviderProps {
  session: Session | null
  children: React.ReactNode
}
export default function CASLProvider({ session, children }: CASLProviderProps) {
  const ability = defineAbilityFor(session?.user)

  return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
}
