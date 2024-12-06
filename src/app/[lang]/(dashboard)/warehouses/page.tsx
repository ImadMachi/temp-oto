import GetAbility from '@/utils/GetAbility'
import Forbidden from '@/features/Forbidden'
import { WarehouseList } from '@/features/dashboard/warehouses'

const WarehouseListPage = async () => {
  const ability = await GetAbility()

  if (!ability.can('manage', 'warehouse')) {
    return <Forbidden />
  }

  return <WarehouseList />
}

export default WarehouseListPage
