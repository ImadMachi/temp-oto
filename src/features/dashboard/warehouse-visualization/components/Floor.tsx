import { useWarehouseStore } from '../hooks/useWarehouseStore'

export default function Floor() {
  const { floorDimensions, floorSelected } = useWarehouseStore()
  const color = floorSelected ? '#E0E0E0' : '#BEBFBA'
  return (
    <mesh position={[0, -1, 0]}>
      <boxGeometry args={floorDimensions} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}
