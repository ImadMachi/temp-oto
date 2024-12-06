import CustomAvatar from '@core/components/mui/Avatar'
import type { ThemeColor } from '@core/types'
import type { UserType } from '@/types/userTypes'
import { getInitials } from '@/utils/getInitials'
import { rankItem } from '@tanstack/match-sorter-utils'
import type { FilterFn } from '@tanstack/react-table'

type UserRoleType = {
  [key: string]: { icon: string; color: string }
}
export const userRoleObj: UserRoleType = {
  1: { icon: 'tabler-shield-lock', color: 'error' },
  2: { icon: 'tabler-briefcase', color: 'warning' },
  3: { icon: 'tabler-trolley', color: 'success' },
  4: { icon: 'tabler-packages', color: 'primary' },
  5: { icon: 'tabler-package', color: 'info' }
}

type UserStatusType = {
  [key: string]: ThemeColor
}
const userStatusObj: UserStatusType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

export const getAvatar = (params: Pick<UserType, 'profile' | 'full_name'>) => {
  const { profile, full_name } = params

  if (profile) {
    return <CustomAvatar src={profile} size={34} />
  } else {
    return <CustomAvatar size={34}>{getInitials(full_name)}</CustomAvatar>
  }
}

export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({
    itemRank
  })
  return itemRank.passed
}
