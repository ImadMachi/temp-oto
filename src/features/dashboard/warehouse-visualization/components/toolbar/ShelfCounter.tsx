import { IconButton } from '@mui/material'
import { useWarehouseStore } from '../../hooks/useWarehouseStore'
import { isRackItem } from '../../utils/helpers'
import type { WarehouseItemType } from '../../types/WarehouseItemTypes'

interface ShelfCounterProps {
  minThreshold: number
  maxThreshold?: number
  step?: number
}
function ShelfCounter({ minThreshold, maxThreshold = 10, step = 1 }: ShelfCounterProps) {
  // Hooks
  const { setWarehouseItems, selectedItemId } = useWarehouseStore()

  // Vars
  const selectedItem = useWarehouseStore.getState().warehouseItems.find(item => item.id == selectedItemId)
  const count = selectedItem && isRackItem(selectedItem) ? selectedItem.numberOfShelves : undefined

  // Method
  const handleAdjustCount = (step: number) => {
    const newItems = useWarehouseStore.getState().warehouseItems.map(item => {
      if (
        item.id === selectedItemId &&
        isRackItem(item) &&
        item.numberOfShelves + step >= minThreshold &&
        item.numberOfShelves + step <= maxThreshold
      ) {
        const newItem = {
          ...item,
          numberOfShelves: +(item.numberOfShelves + step).toFixed(1)
        }
        return newItem
      }
      return item
    })
    setWarehouseItems(newItems)
  }

  if (count === undefined) return null

  return (
    <div className='flex items-center justify-between flex-nowrap'>
      <span className='mr-3 whitespace-nowrap'>Levels :</span>
      <div className='flex items-center justify-center flex-nowrap'>
        <IconButton size='small' onClick={() => handleAdjustCount(-step)}>
          <i className='tabler-minus' />
        </IconButton>
        <span className='mx-3'>{count}</span>
        <IconButton size='small' onClick={() => handleAdjustCount(step)}>
          <i className='tabler-plus' />
        </IconButton>
      </div>
    </div>
  )
}

export default ShelfCounter
