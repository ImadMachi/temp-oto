import type { CreateWarehouseDataType, WarehouseType } from '@/types/warehouseTypes'
import axios from 'axios'

export default async function editWarehouse(
  id: number,
  data: CreateWarehouseDataType,
  accountId?: number
): Promise<WarehouseType> {
  const response = await axios.patch(`/accounts/${accountId}/warehouses/${id}/`, data)
  return response.data
}
