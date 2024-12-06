import type { CreateWarehouseDataType, WarehouseType } from '@/types/warehouseTypes'
import axios from 'axios'

export default async function createWarehouse(
  data: CreateWarehouseDataType,
  accountId?: number
): Promise<WarehouseType> {
  const response = await axios.post(`/accounts/${accountId}/warehouses/`, data)
  return response.data
}
