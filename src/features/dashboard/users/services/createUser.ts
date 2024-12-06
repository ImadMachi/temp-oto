import axios from 'axios'
import type { CreateUserDataType, UserType } from '@/types/userTypes'

export default async function createUser(data: CreateUserDataType, accountId?: number): Promise<UserType> {
  const response = await axios.post(`/accounts/${accountId}/users/`, data)
  return response.data
}
