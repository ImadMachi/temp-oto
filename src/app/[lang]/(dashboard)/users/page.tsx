import GetAbility from '@/utils/GetAbility'
import { UserList } from '@/features/dashboard/users'
import Forbidden from '@/features/Forbidden'

const UserListPage = async () => {
  const ability = await GetAbility()

  if (!ability.can('manage', 'user')) {
    return <Forbidden />
  }

  return <UserList />
}

export default UserListPage
