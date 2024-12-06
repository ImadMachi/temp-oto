export type OrderType = {
  id: string
  date: string
  status: string
  pickupLocation: string
  customerName: string
  customerAddress: string
  destinationCity: string
  orderGrandTotal: number
  currency: string
  paymentStatus: string
  paymentMethod: string
  paymentMethodImageUrl: string
  coords: {
    lat: number
    lng: number
  }
  shipmentNumber: string
  deliveryCompany: string
  trackingNumber: string
  onHoldComment: string
  onHoldReason: string
  deliveryDate: string
  DCReturnReason: string
  customerReturnReason: string
  customerReturnComment: string
  returnShipment: string
  returnDate: string
  returnStatus: string
  cancelReason: string
  cancelComment: string
}
