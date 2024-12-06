import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import createWarehouse from '../services/createWarehouse'
import { useSession } from 'next-auth/react'
import type { CreateWarehouseDataType, WarehouseType } from '@/types/warehouseTypes'

export default function useCreateWarehouse() {
  const { data: session } = useSession()

  const queryClient = useQueryClient()
  return useMutation<WarehouseType, Error, CreateWarehouseDataType>({
    mutationFn: (data: CreateWarehouseDataType) => createWarehouse(data, session?.user.accountId),
    onSuccess: () => {
      toast.success('Warehouse created successfully')
      queryClient.invalidateQueries({ queryKey: ['warehouses'] })
    },
    onError: (error: any) => {
      if (error?.response?.data?.errors?.length > 0) {
        error?.response?.data?.errors.forEach((error: string) => toast.error(error))
      } else {
        toast.error('Error creating warehouse')
      }
    }
  })
}
