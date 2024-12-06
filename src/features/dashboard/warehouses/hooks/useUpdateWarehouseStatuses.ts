import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'
import type { WarehouseStatusType, WarehouseType } from '@/types/warehouseTypes'
import updateWarehouseStatus from '../services/updateWarehouseStatus'

export default function useUpdateWarehouseStatuses() {
  const { data: session } = useSession()

  const queryClient = useQueryClient()
  return useMutation<WarehouseType[], Error, { ids: number[]; data: { status: WarehouseStatusType } }>({
    mutationFn: ({ ids, data }) => {
      return Promise.all(ids.map(id => updateWarehouseStatus(id, data, session?.user.accountId)))
    },
    onSuccess: () => {
      toast.success('Warehouse status updated successfully')
      queryClient.invalidateQueries({ queryKey: ['warehouses'] })
    },
    onError: () => {
      toast.error('Error updating warehouse status')
    }
  })
}
