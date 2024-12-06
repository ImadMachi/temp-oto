import { Canvas } from '@react-three/fiber'
import Floor from './Floor'
import Config from './Config'
import { useWarehouseStore } from '../hooks/useWarehouseStore'
import WarehouseItem from './warehouse-items/WarehouseItem'
import { useRef } from 'react'

export default function Scene() {
  const { warehouseItems, setSelectedItemId, selectedItemId, setFloorSelected } = useWarehouseStore()
  const draggedItemIdRef = useRef<number | null>(null)

  // Methods
  const handleUnselectItem = () => {
    if (!selectedItemId) {
      setFloorSelected(true)
    }
    setSelectedItemId(null)
  }
  return (
    <div className='w-full h-screen'>
      <Canvas style={{ backgroundColor: '#DCD9CC' }} onPointerMissed={handleUnselectItem}>
        <Config />
        <Floor />
        {warehouseItems.map(item => (
          <WarehouseItem key={item.id} item={item} draggedItemIdRef={draggedItemIdRef} />
        ))}
      </Canvas>
    </div>
  )
}
