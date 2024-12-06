import { useWarehouseStore } from '../../hooks/useWarehouseStore'
import type { DockType } from '../../types/WarehouseItemTypes'

interface DockProps {
  item: DockType
}

export default function Dock({ item }: DockProps) {
  // Hooks
  const { selectedItemId, collidedItemId } = useWarehouseStore()

  // Vars
  const isSelected = item.id == selectedItemId
  const isCollided = item.id == collidedItemId

  const width = item.dimensions[0]
  const height = item.dimensions[1]
  const depth = item.dimensions[2]

  const wallColor = isSelected ? '#E0E0E0' : isCollided ? '#FF0000' : '#C8C8C8'
  const floorColor = isSelected ? '#4D4D4D' : isCollided ? '#FF0000' : '#303030'
  const bumpersColor = isSelected ? '#FFE066' : isCollided ? '#FF0000' : '#FFD700'
  const occupiedDockBumpersColor = isSelected ? '#FF6666' : isCollided ? '#FF0000' : '#FF0000'

  return (
    <>
      {/* Main dock structure - back wall */}
      {item.doorOpen ? (
        <mesh position={[0, height - item.thickness * 2, -depth / 2]}>
          <boxGeometry args={[width, height / 10, item.thickness]} />
          <meshStandardMaterial color={wallColor} />
        </mesh>
      ) : (
        <mesh position={[0, height / 2, -depth / 2]}>
          <boxGeometry args={[width, height, item.thickness]} />
          <meshStandardMaterial color={wallColor} />
        </mesh>
      )}

      {/* Side walls */}
      {/* Left wall */}
      <mesh position={[-width / 2, height / 2, 0]}>
        <boxGeometry args={[item.thickness, height, depth]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      {/* Right wall */}
      <mesh position={[width / 2, height / 2, 0]}>
        <boxGeometry args={[item.thickness, height, depth]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      {/* Dock floor/platform */}
      <mesh position={[0, item.thickness / 2, depth / 4]}>
        <boxGeometry args={[width - item.thickness * 2, item.thickness, depth / 2]} />
        <meshStandardMaterial color={floorColor} />
      </mesh>

      {/* Dock bumpers */}
      {/* Left bumper */}
      <mesh position={[-width / 2 + item.thickness * 2, height / 4, depth / 2]}>
        <boxGeometry args={[item.thickness * 2, height / 2, item.thickness * 2]} />
        <meshStandardMaterial color={item.isOccupied ? occupiedDockBumpersColor : bumpersColor} />
      </mesh>

      {/* Right bumper */}
      <mesh position={[width / 2 - item.thickness * 2, height / 4, depth / 2]}>
        <boxGeometry args={[item.thickness * 2, height / 2, item.thickness * 2]} />
        <meshStandardMaterial color={item.isOccupied ? occupiedDockBumpersColor : bumpersColor} />
      </mesh>

      {/* Dock leveler (sloped platform) */}
      <mesh position={[0, item.thickness, depth / 2 - item.thickness]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[width - item.thickness * 4, item.thickness, depth / 4]} />
        <meshStandardMaterial color={floorColor} />
      </mesh>
    </>
  )
}
