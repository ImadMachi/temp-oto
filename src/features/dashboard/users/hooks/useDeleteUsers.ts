import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import deleteUser from '../services/deleteUser'
import { useSession } from 'next-auth/react'

export default function useDeleteUsers() {
  const { data: session } = useSession()

  const queryClient = useQueryClient()
  return useMutation<void[], Error, number[]>({
    mutationFn: userIds => {
      return Promise.all(userIds.map(userId => deleteUser(userId, session?.user.accountId)))
    },
    onSuccess: () => {
      toast.success('Users deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: () => {
      toast.error('Error deleting users')
    }
  })
}
