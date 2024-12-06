import { useRef, type MutableRefObject } from 'react'
import { useThree } from '@react-three/fiber'
import { useDrag } from '@use-gesture/react'
import * as THREE from 'three'
import type { DragState } from '@use-gesture/react'
import structuredClone from 'core-js-pure/actual/structured-clone'
import { useWarehouseStore } from '../../hooks/useWarehouseStore'
import type { WarehouseItemType } from '../../types/WarehouseItemTypes'
import Rack from './Rack'
import { isAtEdge, isColliding, isDeskItem, isDockItem, isRackItem } from '../../utils/helpers'
import Desk from './Desk'
import Dock from './Dock'
import StairRack from './StairRack'

export default function WarehouseItem({
  item,
  draggedItemIdRef
}: {
  item: WarehouseItemType
  draggedItemIdRef: MutableRefObject<number | null>
}): JSX.Element {
  // Refs
  const dragOffsetRef = useRef(new THREE.Vector3())

  // Vars
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
  const planeIntersectPoint = new THREE.Vector3()

  // Hooks
  const { camera } = useThree()
  const { orbitControlsRef, setWarehouseItems, setSelectedItemId, floorDimensions, setFloorSelected } =
    useWarehouseStore()
  const bind = useDrag(handleDrag, {
    filterTaps: true,
    pointer: { capture: true, buttons: 1 }
  })

  // Methods
  const handleSelectItem = () => {
    setSelectedItemId(item.id)
    setFloorSelected(false)
  }

  function handleDrag({ xy, active, first, last }: DragState) {
    if (draggedItemIdRef.current !== null && draggedItemIdRef.current != item.id) {
      return
    }

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    mouse.x = (xy[0] / window.innerWidth) * 2 - 1
    mouse.y = -(xy[1] / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    raycaster.ray.intersectPlane(plane, planeIntersectPoint)

    if (first) {
      draggedItemIdRef.current = item.id
      if (orbitControlsRef?.current) {
        orbitControlsRef.current.enabled = false
      }
      // Calculate the drag offset without triggering any position update
      dragOffsetRef.current.set(
        planeIntersectPoint.x - item.position[0],
        planeIntersectPoint.y - item.position[1],
        planeIntersectPoint.z - item.position[2]
      )
    }

    if (active) {
      const updatedItem = structuredClone(item)
      // Calculate the adjusted position using the offset
      updatedItem.position[0] = Math.floor(planeIntersectPoint.x - dragOffsetRef.current.x)
      // const newY = Math.floor(planeIntersectPoint.y - dragOffsetRef.current.y)
      updatedItem.position[2] = Math.floor(planeIntersectPoint.z - dragOffsetRef.current.z)

      // Only update position if there's no collision
      if (!isColliding(updatedItem) && !isAtEdge(updatedItem, floorDimensions[0], floorDimensions[2])) {
        setWarehouseItems(wis =>
          wis.map(wi =>
            wi.id == item.id
              ? { ...wi, position: [updatedItem.position[0], wi.position[1], updatedItem.position[2]] }
              : wi
          )
        )
      }
    }

    if (last && orbitControlsRef?.current) {
      draggedItemIdRef.current = null
      orbitControlsRef.current.enabled = true
    }
  }

  return (
    <group {...(bind() as any)} onClick={handleSelectItem} position={[...item.position]} rotation={item.rotation}>
      {isRackItem(item) && (item.variant === 'Stair' ? <StairRack item={item} /> : <Rack item={item} />)}
      {isDeskItem(item) && <Desk item={item} />}
      {isDockItem(item) && <Dock item={item} />}
    </group>
  )
}
