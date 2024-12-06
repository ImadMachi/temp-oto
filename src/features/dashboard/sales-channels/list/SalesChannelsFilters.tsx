import DebouncedInput from '@/components/DebouncedInput'
import type { SalesChannelType } from '@/types/SalesChannelTypes'
import { rankItem } from '@tanstack/match-sorter-utils'
import { useEffect, useState } from 'react'

interface SalesChannelsFilters {
  salesChannels: SalesChannelType[]
  setSalesChannels: (param: SalesChannelType[]) => void
  allSalesChannels: SalesChannelType[]
}
export default function SalesChannelsFilters({
  salesChannels,
  allSalesChannels,
  setSalesChannels
}: SalesChannelsFilters) {
  // States
  const [serviceType, setServiceType] = useState('All')
  const [country, setCountry] = useState('All')
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    const filteredSalesChannels = allSalesChannels.filter(salesChannel => {
      // Search Filter
      const nameRank = rankItem(salesChannel.name, searchValue)

      return nameRank.passed
    })

    setSalesChannels(filteredSalesChannels)
  }, [allSalesChannels, setSalesChannels, searchValue, serviceType, country])

  // Methods
  const handleChangeSeach = (value: string | number) => {
    setSearchValue(String(value))
  }

  return (
    <div className='flex flex-wrap gap-2'>
      <DebouncedInput
        fullWidth
        value={searchValue}
        onChange={handleChangeSeach}
        placeholder='Search'
        className='sm:is-auto'
      />
    </div>
  )
}
