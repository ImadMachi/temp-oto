import { IconButton } from '@mui/material'
import { useWarehouseStore } from '../../hooks/useWarehouseStore'
import { wouldItemsOverflow } from '../../utils/helpers'
import type { Vector3 } from '../../types/WarehouseItemTypes'
import { toast } from 'react-toastify'

interface FloorResizerProps {
  label: string
  dimension: 0 | 1 | 2
  minThreshold: number
}
function FloorResizer({ label, dimension, minThreshold }: FloorResizerProps) {
  // Hooks
  const { setFloorDimensions } = useWarehouseStore()

  // Vars
  const count = useWarehouseStore.getState().floorDimensions[dimension]

  // Methods
  const handleResize = (value: number) => {
    const state = useWarehouseStore.getState()

    if (state.floorDimensions[dimension] + value >= minThreshold) {
      const newDimensions: Vector3 = [...state.floorDimensions]
      newDimensions[dimension] += value

      if (!wouldItemsOverflow(newDimensions[0], newDimensions[2])) {
        setFloorDimensions(newDimensions)
      }
    }
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

export default FloorResizer
