import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'
import type { CreateWarehouseDataType, WarehouseType } from '@/types/warehouseTypes'
import editWarehouse from '../services/editWarehouse'

export default function useEditWarehouse() {
  const { data: session } = useSession()

  const queryClient = useQueryClient()
  return useMutation<WarehouseType, Error, { id: number; data: CreateWarehouseDataType }>({
    mutationFn: ({ id, data }) => editWarehouse(id, data, session?.user.accountId),
    onSuccess: () => {
      toast.success('Warehouse edited successfully')
      queryClient.invalidateQueries({ queryKey: ['warehouses'] })
    },
    onError: () => {
      toast.error('Error editing warehouse')
    }
  })
}
