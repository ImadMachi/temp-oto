import { create } from 'zustand'
import type { Vector3, WarehouseItemType } from '../types/WarehouseItemTypes'
import type { RefObject } from 'react'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

interface WarehouseState {
  //State
  orbitControlsRef: RefObject<OrbitControlsImpl> | null
  warehouseItems: WarehouseItemType[]
  selectedItemId: number | null
  collidedItemId: number | null
  draggedItemId: number | null
  floorDimensions: Vector3
  floorSelected: boolean

  //Methods
  setOrbitControlsRef: (orbitControlsRef: any) => void
  setWarehouseItems: (itemsOrCB: WarehouseItemType[] | ((items: WarehouseItemType[]) => WarehouseItemType[])) => void
  setSelectedItemId: (item: number | null) => void
  setCollidedItemId: (item: number | null) => void
  setDraggedItemId: (item: number | null) => void
  setFloorDimensions: (dimensions: Vector3) => void
  setFloorSelected: (floorSelected: boolean) => void
}

export const useWarehouseStore = create<WarehouseState>(set => ({
  //State
  orbitControlsRef: null,
  warehouseItems: getInitialWarehouseItems(),
  selectedItemId: null,
  collidedItemId: null,
  draggedItemId: null,
  floorDimensions: [80, 2, 80],
  floorSelected: false,
  //Methods
  setOrbitControlsRef: orbitControlsRef => set({ orbitControlsRef }),
  setWarehouseItems: itemsOrCallback =>
    set(state => ({
      warehouseItems: typeof itemsOrCallback === 'function' ? itemsOrCallback(state.warehouseItems) : itemsOrCallback
    })),
  setSelectedItemId: item => set({ selectedItemId: item }),
  setCollidedItemId: item => set({ collidedItemId: item }),
  setDraggedItemId: item => set({ draggedItemId: item }),
  setFloorDimensions: dimensions => set({ floorDimensions: dimensions }),
  setFloorSelected: floorSelected => set({ floorSelected })
}))

function getInitialWarehouseItems(): WarehouseItemType[] {
  return [
    {
      id: 1,
      name: 'Rack',
      position: [-9, 6, 0],
      rotation: [0, 0, 0],
      dimensions: [8, 12, 3], // position[1] = dimensions[1] / 2
      numberOfShelves: 3,
      thickness: 0.2
    },
    {
      id: 2,
      name: 'Rack',
      position: [0, 6, 0],
      rotation: [0, 0, 0],
      dimensions: [8, 12, 3], // position[1] = dimensions[1] / 2
      numberOfShelves: 3,
      thickness: 0.2
    },
    {
      id: 3,
      name: 'Rack',
      position: [9, 6, 0],
      rotation: [0, 0, 0],
      dimensions: [6, 12, 3], // position[1] = dimensions[1] / 2
      numberOfShelves: 3,
      thickness: 0.2,
      variant: 'Stair'
    },
    {
      id: 4,
      name: 'Desk',
      position: [18, 3, 0],
      rotation: [0, 0, 0],
      dimensions: [6, 3, 3], // position[1] = dimensions[1]
      thickness: 0.1
    },
    {
      id: 5,
      name: 'Dock',
      position: [-24, 0, 0],
      rotation: [0, 0, 0],
      dimensions: [5, 8, 3],
      thickness: 0.2,
      isOccupied: false,
      doorOpen: true
    },
    {
      id: 6,
      name: 'Dock',
      position: [-30, 0, 0],
      rotation: [0, 0, 0],
      dimensions: [5, 8, 3],
      thickness: 0.2,
      isOccupied: true,
      doorOpen: false
    }
  ]
}
