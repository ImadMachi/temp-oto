// export type ProductType = {
//   id: number
//   name: string
//   description: string
//   sku: string
//   price: number
//   currency: string
//   taxAmount: number
//   barcode: string
//   category: string
//   volume: number
//   length: number
//   width: number
//   height: number
//   weight: number
//   imageUrl: string
// }

export type ProductListType = {
  id: number
  name: string
  description: string
  imageUrl: string
  sku: string
  barcode: string
  price: number
  currency: string
  category: string
}

export type CategoryType = {
  id: number
  name: string
  description: string
  imageUrl: string
}
