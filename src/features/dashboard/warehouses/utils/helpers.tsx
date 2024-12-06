import type { ThemeColor } from '@/@core/types'
import { rankItem } from '@tanstack/match-sorter-utils'
import type { FilterFn } from '@tanstack/react-table'

type StatusChipColorType = {
  color: ThemeColor
}
export const statusChipColor: { [key: string]: StatusChipColorType } = {
  active: { color: 'success' },
  suspended: { color: 'warning' }
}

export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({
    itemRank
  })
  return itemRank.passed
}
