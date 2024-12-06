export type WarehouseType = {
  id: number
  name: string
  country: string
  state: string
  city: string
  address: string
  zip_code: string
  location: string
  status: string
  phone: string
}

export type WarehouseStatusType = 'active' | 'suspended'

export interface CreateWarehouseDataType {
  name: string
  country: string
  state: string
  city: string
  address: string
  zip_code: string
  location: string
  phone: string
}

export interface EditWarehouseDataType {
  name: string
  country: string
  state: string
  city: string
  address: string
  zip_code: string
  location: string
  phone: string
}
