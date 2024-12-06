import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import deleteWarehouse from '../services/deleteWarehouse'
import { useSession } from 'next-auth/react'

export default function useDeleteWarehouses() {
  const { data: session } = useSession()

  const queryClient = useQueryClient()
  return useMutation<void[], Error, number[]>({
    mutationFn: warehouseIds => {
      return Promise.all(warehouseIds.map(warehouseId => deleteWarehouse(warehouseId, session?.user.accountId)))
    },
    onSuccess: () => {
      toast.success('Warehouses deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['warehouses'] })
    },
    onError: () => {
      toast.error('Error deleting warehouses')
    }
  })
}
