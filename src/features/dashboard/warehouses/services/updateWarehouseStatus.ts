import type { WarehouseStatusType, WarehouseType } from '@/types/warehouseTypes'
import axios from 'axios'

export default async function updateWarehouseStatus(
  id: number,
  data: { status: WarehouseStatusType },
  accountId?: number
): Promise<WarehouseType> {
  const response = await axios.patch(`/accounts/${accountId}/warehouses/${id}/`, data)
  return response.data
}
