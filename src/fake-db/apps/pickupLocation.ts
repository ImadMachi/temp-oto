import type { PickupLocationType } from '@/types/pickupLocationTypes'

export const pickupLocations: PickupLocationType[] = [
  {
    id: 1,
    label: 'Riyadh Central Warehouse',
    status: 'active',
    address: 'King Fahd Rd',
    city: 'Riyadh',
    state: 'Riyadh Province',
    country: 'Saudi Arabia',
    zipCode: '12271',
    coords: { lat: 24.7136, lng: 46.6753 }
  },
  {
    id: 2,
    label: 'Jeddah Industrial Depot',
    status: 'active',
    address: 'Madinah Rd',
    city: 'Jeddah',
    state: 'Makkah Province',
    country: 'Saudi Arabia',
    zipCode: '21442',
    coords: { lat: 21.4858, lng: 39.1925 }
  },
  {
    id: 3,
    label: 'Khobar Coastal Hub',
    status: 'active',
    address: 'Prince Faisal Bin Fahd Rd',
    city: 'Al Khobar',
    state: 'Eastern Province',
    country: 'Saudi Arabia',
    zipCode: '31952',
    coords: { lat: 26.2172, lng: 50.1971 }
  },
  {
    id: 4,
    label: 'Dammam North Depot',
    status: 'inactive',
    address: 'King Saud St',
    city: 'Dammam',
    state: 'Eastern Province',
    country: 'Saudi Arabia',
    zipCode: '32241',
    coords: { lat: 26.3927, lng: 49.9777 }
  },
  {
    id: 5,
    label: 'Medina Warehouse',
    status: 'active',
    address: 'Al Haram Rd',
    city: 'Medina',
    state: 'Al Madinah Province',
    country: 'Saudi Arabia',
    zipCode: '42311',
    coords: { lat: 24.5247, lng: 39.5692 }
  },
  {
    id: 6,
    label: 'Tabuk Central Depot',
    status: 'active',
    address: 'King Khalid Rd',
    city: 'Tabuk',
    state: 'Tabuk Province',
    country: 'Saudi Arabia',
    zipCode: '71411',
    coords: { lat: 28.3838, lng: 36.5549 }
  },
  {
    id: 7,
    label: 'Yanbu Distribution Hub',
    status: 'inactive',
    address: 'King Abdulaziz St',
    city: 'Yanbu',
    state: 'Al Madinah Province',
    country: 'Saudi Arabia',
    zipCode: '46424',
    coords: { lat: 24.0895, lng: 38.0637 }
  },
  {
    id: 8,
    label: 'Hail Logistics Center',
    status: 'active',
    address: 'King Faisal Rd',
    city: 'Hail',
    state: 'Hail Province',
    country: 'Saudi Arabia',
    zipCode: '55425',
    coords: { lat: 27.5114, lng: 41.7208 }
  },
  {
    id: 9,
    label: 'Abha Southern Depot',
    status: 'active',
    address: 'King Khalid Rd',
    city: 'Abha',
    state: 'Asir Province',
    country: 'Saudi Arabia',
    zipCode: '61411',
    coords: { lat: 18.2164, lng: 42.5046 }
  },
  {
    id: 10,
    label: 'Mecca Distribution Hub',
    status: 'inactive',
    address: 'Ajyad St',
    city: 'Mecca',
    state: 'Makkah Province',
    country: 'Saudi Arabia',
    zipCode: '24231',
    coords: { lat: 21.4225, lng: 39.8262 }
  },
  {
    id: 11,
    label: 'Jubail Industrial Area',
    status: 'active',
    address: 'Industrial Area Rd',
    city: 'Jubail',
    state: 'Eastern Province',
    country: 'Saudi Arabia',
    zipCode: '35711',
    coords: { lat: 27.0034, lng: 49.6607 }
  }
]
