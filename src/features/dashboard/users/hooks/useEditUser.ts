import type { EditUserDataType, UserType } from '@/types/userTypes'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import editUser from '../services/editUser'
import { useSession } from 'next-auth/react'

export default function useEditUser() {
  const { data: session } = useSession()

  const queryClient = useQueryClient()
  return useMutation<UserType, Error, { id: number; data: EditUserDataType }>({
    mutationFn: ({ id, data }) => editUser(id, data, session?.user.accountId),
    onSuccess: () => {
      toast.success('User Edited successfully')
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: () => {
      toast.error('Error Editing user')
    }
  })
}
