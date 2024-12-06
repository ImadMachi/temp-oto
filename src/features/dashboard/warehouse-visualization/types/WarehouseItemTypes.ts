export type Vector3 = [number, number, number] // [x, y, z]

export type WarehouseItemName = 'Rack' | 'Desk' | 'Dock'

interface BaseWarehouseItemType {
  id: number
  name: WarehouseItemName
  position: Vector3
  rotation: Vector3
  dimensions: Vector3
  thickness: number
}

export interface RackType extends BaseWarehouseItemType {
  name: 'Rack'
  numberOfShelves: number
  variant?: 'Stair'
}

export interface DeskType extends BaseWarehouseItemType {
  name: 'Desk'
}

export interface DockType extends BaseWarehouseItemType {
  name: 'Dock'
  isOccupied?: boolean // Whether a truck is currently at the dock
  doorOpen?: boolean // Whether the dock door is open/closed
}

export type WarehouseItemType = RackType | DeskType | DockType
