import { defineAbilityFor } from '@/configs/abilities'
import { getSession } from '@/configs/auth'

export default async function GetAbility() {
  const session = await getSession()
  const ability = defineAbilityFor(session?.user)

  return ability
}
