import { defineAbility } from '@casl/ability'
import type { MongoAbility } from '@casl/ability'
import type { UserObject } from 'next-auth'

export type AppActions = 'manage' | 'create' | 'read' | 'update' | 'delete'
export type AppSubjects = 'user' | 'warehouse' | 'all'

export type AppAbility = MongoAbility<[AppActions, AppSubjects]>

export const defineAbilityFor = (user?: UserObject) =>
  defineAbility<AppAbility>((can, cannot) => {
    if (!user) {
      return
    }
    const isAdministrator = user.groups?.some(group => group.id == 1)
    if (isAdministrator) {
      can('manage', 'all')
    }
  })
