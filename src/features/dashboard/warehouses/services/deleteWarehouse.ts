import axios from 'axios'

export default async function deleteUser(id: number, accountId?: number): Promise<void> {
  await axios.delete(`/accounts/${accountId}/warehouses/${id}/`)
}
