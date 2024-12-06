'use client'
import { type AppActions, type AppSubjects } from '@/configs/abilities'
import { AbilityContext } from '@/contexts/AbilityContext'
import { useContext } from 'react'

interface CanProps {
  children: React.ReactNode
  I: AppActions
  a: AppSubjects
  not?: boolean
}
export default function Can({ children, I, a, not = false }: CanProps) {
  const ability = useContext(AbilityContext)

  const isAllowed = not ? ability.cannot(I, a) : ability.can(I, a)

  return <>{isAllowed && children}</>
}
