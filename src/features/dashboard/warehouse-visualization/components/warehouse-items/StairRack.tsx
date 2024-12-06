import { useWarehouseStore } from '../../hooks/useWarehouseStore'
import type { RackType } from '../../types/WarehouseItemTypes'

interface RackProps {
  item: RackType
}

export default function RackWithStairs({ item }: RackProps) {
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
  const stairColor = isSelected ? '#8AACDB' : isCollided ? '#FF0000' : '#4B7199'

  const floorHeight = height / (item.numberOfShelves + 1)
  const numberOfSteps = 20
  const stepWidth = width / numberOfSteps
  const stepDepth = depth / 2
  const stepHeight = floorHeight / numberOfSteps

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

      {/* Floors and Stairs for each level */}
      {Array.from({ length: item.numberOfShelves }, (_, floorIndex) => {
        const floorY = (height / (item.numberOfShelves + 1)) * (floorIndex + 1) - height / 2

        return (
          <group key={floorIndex}>
            {/* Platform (front half) */}
            <mesh position={[0, floorY, depth / 4]}>
              <boxGeometry args={[width, item.thickness, depth / 2]} />
              <meshStandardMaterial color={shelfColor} />
            </mesh>

            {/* Stairs (back half) */}
            {Array.from({ length: numberOfSteps }, (_, stepIndex) => {
              const stepX = -width / 2 + stepWidth * (stepIndex + 0.5)
              const stepY = floorY - floorHeight + stepHeight * (stepIndex + 1)

              return (
                <mesh key={stepIndex} position={[stepX, stepY, -depth / 4]}>
                  <boxGeometry args={[stepWidth, item.thickness, stepDepth]} />
                  <meshStandardMaterial color={stairColor} />
                </mesh>
              )
            })}
          </group>
        )
      })}
    </>
  )
}
