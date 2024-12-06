export type PickupLocationType = {
  id: number
  label: string
  status: 'active' | 'inactive'
  address: string
  city: string
  state: string
  country: string
  zipCode: string
  coords: {
    lat: number
    lng: number
  }
}
