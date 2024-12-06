import type { UserType } from '@/types/userTypes'
import { useQuery } from '@tanstack/react-query'
import getUsers from '../services/getUsers'
import { useSession } from 'next-auth/react'

export default function useUsers() {
  const { data: session } = useSession()

  return useQuery<UserType[], Error>({
    queryKey: ['users'],
    enabled: !!session,
    queryFn: () => getUsers(session?.user.accountId),
    meta: {
      errorMessage: 'Error fetching users'
    }
  })
}
