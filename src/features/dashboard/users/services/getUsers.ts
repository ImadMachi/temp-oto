import axios from 'axios'

export default async function getUsers(accountId?: number) {
  const response = await axios.get(`/accounts/${accountId}/users/`)
  const users = response.data.map((instance: any) => {
    const { user, ...rest } = instance
    return { ...rest, ...user }
  })

  return users
}
