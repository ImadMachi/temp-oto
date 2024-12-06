import { useWarehouseStore } from '../../hooks/useWarehouseStore'
import type { RackType } from '../../types/WarehouseItemTypes'

interface RackProps {
  item: RackType
}
export default function Rack({ item }: RackProps) {
  // Hooks
  const { selectedItemId, collidedItemId } = useWarehouseStore()

  // Vars
  const isSelected = item.id == selectedItemId
  const isCollided = item.id == collidedItemId

  const width = item.dimensions[0]
  const height = item.dimensions[1]
  const depth = item.dimensions[2]

  const uprightColor = isSelected ? '#6A92C2' : isCollided ? '#FF0000' : '#33557C'
  const shelfColor = isSelected ? '#FFC48A' : isCollided ? '#FF0000' : '#E89952'

  return (
    <>
      {/* Back Vertical Supports */}
      <mesh position={[-(width / 2), 0, -(depth / 2)]}>
        <boxGeometry args={[item.thickness, height, item.thickness]} />
        <meshStandardMaterial color={uprightColor} />
      </mesh>
      <mesh position={[width / 2, 0, -(depth / 2)]}>
        <boxGeometry args={[item.thickness, height, item.thickness]} />
        <meshStandardMaterial color={uprightColor} />
      </mesh>
      {/* Front Vertical Supports */}
      <mesh position={[-(width / 2), 0, depth / 2]}>
        <boxGeometry args={[item.thickness, height, item.thickness]} />
        <meshStandardMaterial color={uprightColor} />
      </mesh>
      <mesh position={[width / 2, 0, depth / 2]}>
        <boxGeometry args={[item.thickness, height, item.thickness]} />
        <meshStandardMaterial color={uprightColor} />
      </mesh>
      {/* Shelves */}
      {Array.from({ length: item.numberOfShelves }, (_, floorIndex) => {
        const floorY = (height / (item.numberOfShelves + 1)) * (floorIndex + 1) - height / 2

        return (
          <mesh key={floorIndex} position={[0, floorY, 0]}>
            <boxGeometry args={[width, item.thickness, depth]} />
            <meshStandardMaterial color={shelfColor} />
          </mesh>
        )
      })}
    </>
  )
}
