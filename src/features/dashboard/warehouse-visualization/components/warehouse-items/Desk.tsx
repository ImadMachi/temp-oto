import { useWarehouseStore } from '../../hooks/useWarehouseStore'
import type { DeskType } from '../../types/WarehouseItemTypes'

interface DeskProps {
  item: DeskType
}

export default function Desk({ item }: DeskProps) {
  // Hooks
  const { selectedItemId, collidedItemId } = useWarehouseStore()

  // Vars
  const isSelected = item.id == selectedItemId
  const isCollided = item.id == collidedItemId

  const width = item.dimensions[0]
  const height = item.dimensions[1]
  const depth = item.dimensions[2]

  // Calculate relative sizes for computer components
  const monitorWidth = width * 0.4 // Monitor width relative to desk width
  const monitorHeight = height * 0.35 // Monitor height relative to desk height
  const monitorDepth = depth * 0.05 // Monitor thickness
  const monitorStandWidth = monitorWidth * 0.1 // Stand width relative to monitor

  // Calculate monitor position and stand height
  const monitorBottomHeight = item.thickness + monitorHeight / 2 // Height of monitor bottom from desk surface
  const monitorStandHeight = monitorBottomHeight // Stand height matches distance from desk to monitor bottom

  const keyboardWidth = monitorWidth * 0.8 // Keyboard slightly smaller than monitor
  const keyboardHeight = height * 0.01 // Keep keyboard thin
  const keyboardDepth = depth * 0.2 // Keyboard depth

  const towerWidth = width * 0.12 // Tower width relative to desk
  const towerHeight = height * 0.5 // Tower height relative to desk
  const towerDepth = depth * 0.3 // Tower depth relative to desk

  const woodColor = isSelected ? '#F2B585' : isCollided ? '#FF0000' : '#E89952'
  const legColor = isSelected ? '#866444' : isCollided ? '#FF0000' : '#614124'
  const monitorColor = isSelected ? '#515B60' : isCollided ? '#FF0000' : '#2C3539'
  const keyboardColor = isSelected ? '#3A3A3A' : isCollided ? '#FF0000' : '#1C1C1C'
  const computerColor = isSelected ? '#515B60' : isCollided ? '#FF0000' : '#2C3539'

  return (
    <>
      {/* Existing desk structure */}
      {/* Desktop surface */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width, item.thickness, depth]} />
        <meshStandardMaterial color={woodColor} />
      </mesh>

      {/* Legs */}
      {/* Front Left Leg */}
      <mesh position={[-(width / 2 - item.thickness), -(height / 2), depth / 2 - item.thickness]}>
        <boxGeometry args={[item.thickness * 2, height, item.thickness * 2]} />
        <meshStandardMaterial color={legColor} />
      </mesh>

      {/* Front Right Leg */}
      <mesh position={[width / 2 - item.thickness, -(height / 2), depth / 2 - item.thickness]}>
        <boxGeometry args={[item.thickness * 2, height, item.thickness * 2]} />
        <meshStandardMaterial color={legColor} />
      </mesh>

      {/* Back Left Leg */}
      <mesh position={[-(width / 2 - item.thickness), -(height / 2), -(depth / 2 - item.thickness)]}>
        <boxGeometry args={[item.thickness * 2, height, item.thickness * 2]} />
        <meshStandardMaterial color={legColor} />
      </mesh>

      {/* Back Right Leg */}
      <mesh position={[width / 2 - item.thickness, -(height / 2), -(depth / 2 - item.thickness)]}>
        <boxGeometry args={[item.thickness * 2, height, item.thickness * 2]} />
        <meshStandardMaterial color={legColor} />
      </mesh>

      {/* Side Panels */}
      {/* Left Side */}
      <mesh position={[-(width / 2 - item.thickness), -(height / 4), 0]}>
        <boxGeometry args={[item.thickness, height / 2, depth - item.thickness * 4]} />
        <meshStandardMaterial color={woodColor} />
      </mesh>

      {/* Right Side */}
      <mesh position={[width / 2 - item.thickness, -(height / 4), 0]}>
        <boxGeometry args={[item.thickness, height / 2, depth - item.thickness * 4]} />
        <meshStandardMaterial color={woodColor} />
      </mesh>

      {/* Back Panel */}
      <mesh position={[0, -(height / 6), -(depth / 2 - item.thickness)]}>
        <boxGeometry args={[width - item.thickness * 4, height / 3, item.thickness]} />
        <meshStandardMaterial color={woodColor} />
      </mesh>

      {/* Computer Setup */}
      {/* Monitor Stand - Now stretches from desk to monitor bottom */}
      <mesh position={[0, item.thickness + monitorStandHeight / 2, -depth / 3]}>
        <boxGeometry args={[monitorStandWidth, monitorStandHeight, monitorStandWidth]} />
        <meshStandardMaterial color={monitorColor} />
      </mesh>

      {/* Monitor Screen */}
      <mesh position={[0, item.thickness + monitorHeight, -depth / 3]}>
        <boxGeometry args={[monitorWidth, monitorHeight, monitorDepth]} />
        <meshStandardMaterial color={monitorColor} />
      </mesh>

      {/* Monitor Screen Display (slightly lighter) */}
      <mesh position={[0, item.thickness + monitorHeight, -depth / 3 + monitorDepth / 2]}>
        <boxGeometry args={[monitorWidth * 0.95, monitorHeight * 0.9, monitorDepth * 0.1]} />
        <meshStandardMaterial color='#404040' />
      </mesh>

      {/* Keyboard */}
      <mesh position={[0, item.thickness + keyboardHeight / 2, -depth / 6]}>
        <boxGeometry args={[keyboardWidth, keyboardHeight, keyboardDepth]} />
        <meshStandardMaterial color={keyboardColor} />
      </mesh>

      {/* Computer Tower */}
      <group position={[width / 3, item.thickness / 2, 0]}>
        {/* Main Tower */}
        <mesh position={[0, towerHeight / 2, 0]}>
          <boxGeometry args={[towerWidth, towerHeight, towerDepth]} />
          <meshStandardMaterial color={computerColor} />
        </mesh>

        {/* Power Button */}
        <mesh position={[towerWidth / 2 + 0.01, towerHeight * 0.75, 0]}>
          <cylinderGeometry args={[towerWidth * 0.06, towerWidth * 0.06, towerWidth * 0.1, 16]} />
          <meshStandardMaterial color='#666666' />
        </mesh>

        {/* USB Ports */}
        <mesh position={[towerWidth / 2 + 0.01, towerHeight * 0.6, 0]}>
          <boxGeometry args={[0.01, towerHeight * 0.15, towerDepth * 0.4]} />
          <meshStandardMaterial color='#333333' />
        </mesh>
      </group>
    </>
  )
}
