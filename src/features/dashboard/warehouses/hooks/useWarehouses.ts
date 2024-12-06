import type { WarehouseType } from '@/types/warehouseTypes'
import { useQuery } from '@tanstack/react-query'
import getWarehouses from '../services/getWarehouses'
import { useSession } from 'next-auth/react'

export default function useWarehouses() {
  const { data: session } = useSession()

  return useQuery<WarehouseType[], Error>({
    queryKey: ['warehouses'],
    enabled: !!session,
    queryFn: () => getWarehouses(session?.user.accountId),
    meta: {
      errorMessage: 'Error fetching  warehouses'
    }
  })
}
