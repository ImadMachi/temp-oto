import CustomTextField from '@/@core/components/mui/TextField'
import DebouncedInput from '@/components/DebouncedInput'
import type { ShippingPartnerType } from '@/types/ShippingPartnerTypes'
import { MenuItem } from '@mui/material'
import { rankItem } from '@tanstack/match-sorter-utils'
import { useEffect, useState } from 'react'

interface PartnersFilters {
  partners: ShippingPartnerType[]
  setPartners: (param: ShippingPartnerType[]) => void
  allPartners: ShippingPartnerType[]
}
export default function PartnersFilters({ partners, allPartners, setPartners }: PartnersFilters) {
  // States
  const [serviceType, setServiceType] = useState('All')
  const [country, setCountry] = useState('All')
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    const filteredPartners = allPartners.filter(partner => {
      // Search Filter
      const nameRank = rankItem(partner.name, searchValue)
      const serviceTypeRank = rankItem(partner.serviceType, serviceType)
      const countryRank = rankItem(partner.country, searchValue)
      const totalRank = nameRank.passed || serviceTypeRank.passed || countryRank.passed

      // Country Filter
      const isCountryMatch = partner.country === country || country === 'All'

      // Service Type Filter
      const isServiceTypeMatch = partner.serviceType === serviceType || serviceType === 'All'

      return totalRank && isCountryMatch && isServiceTypeMatch
    })

    setPartners(filteredPartners)
  }, [searchValue, serviceType, country, allPartners, setPartners])

  // Methods
  const handleChangeService = (event: React.ChangeEvent<HTMLInputElement>) => {
    setServiceType(event.target.value)
  }

  const handleChangeCountry = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value)
  }

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
      <CustomTextField select value={country} onChange={handleChangeCountry} className='is-[180px] max-sm:is-full'>
        <MenuItem value='All'>All Countries</MenuItem>
        <MenuItem value='Saudi Arabia'>Saudi Arabia</MenuItem>
        <MenuItem value='UAE'>UAE</MenuItem>
        <MenuItem value='Qatar'>Qatar</MenuItem>
        <MenuItem value='Egypt'>Egypt</MenuItem>
        <MenuItem value='Kuwait'>Kuwait</MenuItem>
        <MenuItem value='Oman'>Oman</MenuItem>
        <MenuItem value='Bahrain'>Bahrain</MenuItem>
        <MenuItem value='Turkey'>Turkey</MenuItem>
      </CustomTextField>
      <CustomTextField select value={serviceType} onChange={handleChangeService} className='is-[180px] max-sm:is-full'>
        <MenuItem value='All'>All Service Types</MenuItem>
        <MenuItem value='Standard'>Standard</MenuItem>
        <MenuItem value='Express'>Express</MenuItem>
        <MenuItem value='Economy'>Economy</MenuItem>
      </CustomTextField>
    </div>
  )
}
