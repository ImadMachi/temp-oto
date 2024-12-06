import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import type { CreateUserDataType, UserType } from '@/types/userTypes'
import createUser from '../services/createUser'
import { useSession } from 'next-auth/react'

export default function useCreateUser() {
  const { data: session } = useSession()

  const queryClient = useQueryClient()
  return useMutation<UserType, Error, CreateUserDataType>({
    mutationFn: (data: CreateUserDataType) => createUser(data, session?.user.accountId),
    onSuccess: () => {
      toast.success('User created successfully')
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (error: any) => {
      if (error?.response?.data?.errors?.length > 0) {
        error?.response?.data?.errors.forEach((error: string) => toast.error(error))
      } else {
        toast.error('Error creating user')
      }
    }
  })
}
