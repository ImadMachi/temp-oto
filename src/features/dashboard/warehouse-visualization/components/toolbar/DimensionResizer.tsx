import { IconButton } from '@mui/material'
import { useWarehouseStore } from '../../hooks/useWarehouseStore'
import { isAtEdge, isColliding, isDeskItem, isRackItem } from '../../utils/helpers'
import structuredClone from 'core-js-pure/actual/structured-clone'

interface DimensionResizerProps {
  label: string
  dimension: 0 | 1 | 2
  minThreshold: number
}
function DimensionResizer({ label, dimension, minThreshold }: DimensionResizerProps) {
  // Hooks
  const { setWarehouseItems, selectedItemId } = useWarehouseStore()

  // Vars
  const count = useWarehouseStore.getState().warehouseItems.find(item => item.id == selectedItemId)?.dimensions[
    dimension
  ]

  // Methods
  const handleResize = (value: number) => {
    const state = useWarehouseStore.getState()
    const newItems = state.warehouseItems.map(item => {
      if (item.id === state.selectedItemId && item.dimensions[dimension] + value >= minThreshold) {
        const updatedItem = structuredClone(item)

        updatedItem.dimensions[dimension] += value

        if (dimension == 1) {
          if (isRackItem(item)) {
            updatedItem.position[1] = updatedItem.dimensions[1] / 2
          } else if (isDeskItem(item)) {
            updatedItem.position[1] = updatedItem.dimensions[1]
          }
        } else {
          updatedItem.position[dimension] += value / 2
        }

        if (isColliding(updatedItem) || isAtEdge(updatedItem, state.floorDimensions[0], state.floorDimensions[2])) {
          return item
        } else {
          return updatedItem
        }
      }
      return item
    })
    setWarehouseItems(newItems)
  }

  return (
    <div className='flex items-center justify-between flex-nowrap'>
      <span className='mr-3 whitespace-nowrap'>{label} :</span>
      <div className='flex items-center justify-center flex-nowrap'>
        <IconButton size='small' onClick={() => handleResize(-1)}>
          <i className='tabler-minus' />
        </IconButton>
        <span className='mx-3'>{count}</span>
        <IconButton size='small' onClick={() => handleResize(1)}>
          <i className='tabler-plus' />
        </IconButton>
      </div>
    </div>
  )
}

export default DimensionResizer
