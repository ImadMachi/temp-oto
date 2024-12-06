import { IconButton } from '@mui/material'
import { useWarehouseStore } from '../../hooks/useWarehouseStore'

interface ThicknessCounterProps {
  minThreshold: number
  maxThreshold?: number
  step?: number
}
function ThicknessCounter({ minThreshold, maxThreshold = 10, step = 1 }: ThicknessCounterProps) {
  // Hooks
  const { setWarehouseItems, selectedItemId } = useWarehouseStore()

  // Vars
  const selectedItem = useWarehouseStore.getState().warehouseItems.find(item => item.id == selectedItemId)
  const count = selectedItem ? selectedItem.thickness : undefined

  // Method
  const handleAdjustCount = (step: number) => {
    const newItems = useWarehouseStore.getState().warehouseItems.map(item => {
      if (
        item.id === selectedItemId &&
        item.thickness + step >= minThreshold &&
        item.thickness + step <= maxThreshold
      ) {
        const newItem = {
          ...item,
          thickness: +(item.thickness + step).toFixed(1)
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
      <span className='mr-3 whitespace-nowrap'>Thickness :</span>
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

export default ThicknessCounter
