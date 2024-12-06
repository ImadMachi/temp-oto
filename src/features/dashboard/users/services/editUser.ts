import type { EditUserDataType, UserType } from '@/types/userTypes'
import axios from 'axios'

export default async function editUser(id: number, data: EditUserDataType, accountId?: number): Promise<UserType> {
  const response = await axios.patch(`/accounts/${accountId}/users/${id}/`, data)
  return response.data
}
