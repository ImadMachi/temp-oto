export interface StorageItemType {
  id: number
  name: 'Rack' | 'Obstruction'
  x: number
  y: number
  width: number
  height: number
  numberOfShelves: number
  numberOfBinsPerShelf: number
}

export interface Position {
  x: number
  y: number
}

export interface CanvasBoundaries {
  maxGridX: number
  maxGridY: number
}

export interface Dimensions {
  width: number
  height: number
}
