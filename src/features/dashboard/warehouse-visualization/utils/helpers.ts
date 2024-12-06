import { toast } from 'react-toastify'
import { useWarehouseStore } from '../hooks/useWarehouseStore'
import type { DeskType, DockType, RackType, Vector3, WarehouseItemType } from '../types/WarehouseItemTypes'

export function isRackItem(item: WarehouseItemType): item is RackType {
  return item.name === 'Rack'
}

export function isDeskItem(item: WarehouseItemType): item is DeskType {
  return item.name === 'Desk'
}

export function isDockItem(item: WarehouseItemType): item is DockType {
  return item.name === 'Dock'
}

// Helper function to get rotated corners of an item
function getRotatedCorners(x: number, z: number, width: number, depth: number, rotation: number[]) {
  const yRotation = rotation[1] // We only care about Y-axis rotation for 2D collision
  const cos = Math.cos(yRotation)
  const sin = Math.sin(yRotation)

  // Calculate half dimensions
  const halfWidth = width / 2
  const halfDepth = depth / 2

  // Calculate corners relative to center
  const corners = [
    { x: -halfWidth, z: -halfDepth }, // front-left
    { x: halfWidth, z: -halfDepth }, // front-right
    { x: halfWidth, z: halfDepth }, // back-right
    { x: -halfWidth, z: halfDepth } // back-left
  ]

  // Rotate and translate corners
  return corners.map(corner => ({
    x: x + (corner.x * cos - corner.z * sin),
    z: z + (corner.x * sin + corner.z * cos)
  }))
}

// Helper function to check if two rotated rectangles intersect
function checkRectangleCollision(corners1: { x: number; z: number }[], corners2: { x: number; z: number }[]): boolean {
  // Using Separating Axis Theorem (SAT)
  const edges = [
    // Edges from first rectangle
    { x: corners1[1].x - corners1[0].x, z: corners1[1].z - corners1[0].z },
    { x: corners1[1].x - corners1[2].x, z: corners1[1].z - corners1[2].z },
    // Edges from second rectangle
    { x: corners2[1].x - corners2[0].x, z: corners2[1].z - corners2[0].z },
    { x: corners2[1].x - corners2[2].x, z: corners2[1].z - corners2[2].z }
  ]

  for (const edge of edges) {
    // Get normal (perpendicular) vector
    const normal = { x: -edge.z, z: edge.x }

    // Project all corners onto this normal
    const proj1 = corners1.map(c => c.x * normal.x + c.z * normal.z)
    const proj2 = corners2.map(c => c.x * normal.x + c.z * normal.z)

    // Find min and max projections
    const min1 = Math.min(...proj1)
    const max1 = Math.max(...proj1)
    const min2 = Math.min(...proj2)
    const max2 = Math.max(...proj2)

    // Check for gap
    if (max1 < min2 || max2 < min1) {
      return false
    }
  }

  return true
}

let collisionTimer: NodeJS.Timeout | null = null

function setCollidedItemIdOnce(id: number) {
  if (collisionTimer) {
    clearTimeout(collisionTimer)
  }
  useWarehouseStore.getState().setCollidedItemId(id)

  collisionTimer = setTimeout(() => {
    useWarehouseStore.getState().setCollidedItemId(null)
    collisionTimer = null
  }, 1000)
}

export const isColliding = (item: WarehouseItemType, buffer: number = -1): boolean => {
  const x = item.position[0]
  const z = item.position[2]
  const itemHeight = item.dimensions[1]
  const itemYMin = item.position[1] - itemHeight / 2
  const itemYMax = item.position[1] + itemHeight / 2

  // Get corners of the item at the new position
  const itemCorners = getRotatedCorners(
    x,
    z,
    item.dimensions[0] + buffer * 2,
    item.dimensions[2] + buffer * 2,
    item.rotation
  )

  return useWarehouseStore.getState().warehouseItems.some(wi => {
    if (wi.id !== item.id) {
      const wiHeight = wi.dimensions[1]
      const wiYMin = wi.position[1] - wiHeight / 2
      const wiYMax = wi.position[1] + wiHeight / 2

      // Check vertical overlap first
      const verticalOverlap = itemYMin - buffer <= wiYMax && itemYMax + buffer >= wiYMin

      if (!verticalOverlap) return false

      // Get corners of the other item
      const wiCorners = getRotatedCorners(
        wi.position[0],
        wi.position[2],
        wi.dimensions[0],
        wi.dimensions[2],
        wi.rotation
      )

      const isColliding = checkRectangleCollision(itemCorners, wiCorners)
      if (isColliding) {
        setCollidedItemIdOnce(wi.id)
      }
      return isColliding
    }
    return false
  })
}

export function isAtEdge(item: WarehouseItemType, floorWidth: number, floorDepth: number): boolean {
  const x = item.position[0]
  const z = item.position[2]

  // Get corners of the rotated item
  const corners = getRotatedCorners(x, z, item.dimensions[0], item.dimensions[2], item.rotation)

  // Calculate floor limits
  const floorWidthLimit = floorWidth / 2
  const floorDepthLimit = floorDepth / 2

  // Check if any corner exceeds floor boundaries
  const isAtEdge = corners.some(
    corner =>
      corner.x <= -floorWidthLimit ||
      corner.x >= floorWidthLimit ||
      corner.z <= -floorDepthLimit ||
      corner.z >= floorDepthLimit
  )

  return isAtEdge
}

let lastToastTime = 0
const delay = 3000
export function wouldItemsOverflow(newWidth: number, newDepth: number) {
  const wouldItemsOverflow = useWarehouseStore.getState().warehouseItems.some(item => {
    return isAtEdge(item, newWidth, newDepth)
  })
  const now = Date.now()
  if (wouldItemsOverflow && now - lastToastTime > delay) {
    toast.error('Items will overflow the floor', {
      position: 'top-center'
    })
    lastToastTime = now
  }
  return wouldItemsOverflow
}

export function findNearestEmptyPosition(
  item: WarehouseItemType,
  floorWidth: number,
  floorDepth: number
): Vector3 | null {
  const startX = item.position[0]
  const startZ = item.position[2]
  const y = item.position[1]

  // Define search parameters
  const stepSize = 1 // Size of each step in the search
  const maxSearchRadius = Math.max(floorWidth, floorDepth) // Maximum search distance
  const searchPositions: Array<[number, number]> = []

  // Generate positions in a spiral pattern
  for (let radius = stepSize; radius <= maxSearchRadius; radius += stepSize) {
    // Check positions in a square pattern at current radius
    for (let dx = -radius; dx <= radius; dx += stepSize) {
      // Check top and bottom edges of the square
      searchPositions.push([startX + dx, startZ + radius])
      searchPositions.push([startX + dx, startZ - radius])
    }
    for (let dz = -radius + stepSize; dz < radius; dz += stepSize) {
      // Check left and right edges of the square
      searchPositions.push([startX + radius, startZ + dz])
      searchPositions.push([startX - radius, startZ + dz])
    }
  }

  // Try each position
  for (const [newX, newZ] of searchPositions) {
    const testItem: WarehouseItemType = {
      ...item,
      id: Date.now(), // Temporary ID for collision testing
      position: [newX, y, newZ]
    }

    // Check if this position is valid (no collisions and within bounds)
    if (!isColliding(testItem) && !isAtEdge(testItem, floorWidth, floorDepth)) {
      return [newX, y, newZ]
    }
  }

  // No valid position found
  return null
}
