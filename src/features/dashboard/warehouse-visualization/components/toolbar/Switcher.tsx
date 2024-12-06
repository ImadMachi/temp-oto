import { Switch } from '@mui/material'
import { useWarehouseStore } from '../../hooks/useWarehouseStore'
import { isDockItem } from '../../utils/helpers'

interface SwitcherProps {
  label: string
  attribute: 'doorOpen' | 'isOccupied'
}
function Switcher({ label, attribute }: SwitcherProps) {
  // Hooks
  const { setWarehouseItems, selectedItemId } = useWarehouseStore()

  // Vars
  const item = useWarehouseStore.getState().warehouseItems.find(item => item.id == selectedItemId)
  const propertyState = item && isDockItem(item) ? item[attribute] : undefined

  // Method
  const handleChange = () => {
    const newItems = useWarehouseStore.getState().warehouseItems.map(item => {
      if (item.id === selectedItemId && isDockItem(item)) {
        return {
          ...item,
          [attribute]: !item[attribute]
        }
      }
      return item
    })
    setWarehouseItems(newItems)
  }

  if (propertyState === undefined) return null

  return (
    <div className='flex items-center justify-between flex-nowrap'>
      <span className='mr-3 whitespace-nowrap'>{label} :</span>
      <div className='flex items-center justify-center flex-nowrap'>
        <Switch
          size='small'
          checked={propertyState}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </div>
    </div>
  )
}

export default Switcher
