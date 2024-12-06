import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import deleteUser from '../services/deleteUser'
import { useSession } from 'next-auth/react'

export default function useDeleteUser() {
  const { data: session } = useSession()

  const queryClient = useQueryClient()
  return useMutation<void, Error, number>({
    mutationFn: userId => deleteUser(userId, session?.user.accountId),
    onSuccess: () => {
      toast.success('User deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: () => {
      toast.error('Error deleting user')
    }
  })
}
