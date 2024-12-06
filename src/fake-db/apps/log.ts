import type { LogType } from '@/types/logTypes'

export const logs: LogType[] = [
  {
    id: 'log_001',
    orderId: 'order_101',
    orderDate: '2024-10-01T10:15:00Z',
    deliveryCompany: 'DHL',
    url: 'https://api.example.com/webhook/1',
    errorTime: '2024-10-01T10:20:00Z',
    errorMessage: 'Invalid address format',
    method: 'POST',
    webhookText: 'Address not valid',
    nextAttemptTime: '2024-10-02T10:00:00Z',
    numberOfAttempts: 1,
    pickupId: 'pickup_01',
    createdDate: '2024-10-01T09:00:00Z',
    shipmentNumber: 'SHIP12345',
    status: 'Error',
    logStatus: 'Pending'
  },
  {
    id: 'log_002',
    orderId: 'order_102',
    orderDate: '2024-10-02T11:00:00Z',
    deliveryCompany: 'FedEx',
    url: 'https://api.example.com/webhook/2',
    errorTime: '2024-10-02T11:05:00Z',
    errorMessage: 'Payment failed',
    method: 'POST',
    webhookText: 'Payment was declined',
    nextAttemptTime: '2024-10-03T11:00:00Z',
    numberOfAttempts: 2,
    pickupId: 'pickup_02',
    createdDate: '2024-10-02T10:30:00Z',
    shipmentNumber: 'SHIP54321',
    status: 'Failed',
    logStatus: 'Pending'
  },
  {
    id: 'log_003',
    orderId: 'order_103',
    orderDate: '2024-10-03T12:15:00Z',
    deliveryCompany: 'UPS',
    url: 'https://api.example.com/webhook/3',
    errorTime: '2024-10-03T12:20:00Z',
    errorMessage: 'Insufficient stock',
    method: 'POST',
    webhookText: 'Not enough stock available',
    nextAttemptTime: '2024-10-04T12:00:00Z',
    numberOfAttempts: 3,
    pickupId: 'pickup_03',
    createdDate: '2024-10-03T11:00:00Z',
    shipmentNumber: 'SHIP98765',
    status: 'Error',
    logStatus: 'Failed'
  },
  {
    id: 'log_004',
    orderId: 'order_104',
    orderDate: '2024-10-04T13:00:00Z',
    deliveryCompany: 'DHL',
    url: 'https://api.example.com/webhook/4',
    errorTime: '2024-10-04T13:10:00Z',
    errorMessage: 'Timeout on webhook',
    method: 'POST',
    webhookText: 'No response from server',
    nextAttemptTime: '2024-10-05T13:00:00Z',
    numberOfAttempts: 1,
    pickupId: 'pickup_04',
    createdDate: '2024-10-04T12:30:00Z',
    shipmentNumber: 'SHIP12398',
    status: 'Error',
    logStatus: 'Pending'
  },
  {
    id: 'log_005',
    orderId: 'order_105',
    orderDate: '2024-10-05T09:30:00Z',
    deliveryCompany: 'FedEx',
    url: 'https://api.example.com/webhook/5',
    errorTime: '2024-10-05T09:35:00Z',
    errorMessage: 'Unauthorized access',
    method: 'POST',
    webhookText: 'Access token invalid',
    nextAttemptTime: '2024-10-06T09:00:00Z',
    numberOfAttempts: 2,
    pickupId: 'pickup_05',
    createdDate: '2024-10-05T08:30:00Z',
    shipmentNumber: 'SHIP12987',
    status: 'Failed',
    logStatus: 'Error'
  },
  {
    id: 'log_006',
    orderId: 'order_106',
    orderDate: '2024-10-06T14:20:00Z',
    deliveryCompany: 'UPS',
    url: 'https://api.example.com/webhook/6',
    errorTime: '2024-10-06T14:25:00Z',
    errorMessage: 'Invalid order ID',
    method: 'POST',
    webhookText: 'Order ID does not exist',
    nextAttemptTime: '2024-10-07T14:00:00Z',
    numberOfAttempts: 1,
    pickupId: 'pickup_06',
    createdDate: '2024-10-06T13:00:00Z',
    shipmentNumber: 'SHIP89754',
    status: 'Error',
    logStatus: 'Pending'
  },
  {
    id: 'log_007',
    orderId: 'order_107',
    orderDate: '2024-10-07T15:00:00Z',
    deliveryCompany: 'DHL',
    url: 'https://api.example.com/webhook/7',
    errorTime: '2024-10-07T15:10:00Z',
    errorMessage: 'Webhook not reachable',
    method: 'POST',
    webhookText: 'Failed to reach webhook URL',
    nextAttemptTime: '2024-10-08T15:00:00Z',
    numberOfAttempts: 2,
    pickupId: 'pickup_07',
    createdDate: '2024-10-07T14:00:00Z',
    shipmentNumber: 'SHIP78956',
    status: 'Failed',
    logStatus: 'Error'
  },
  {
    id: 'log_008',
    orderId: 'order_108',
    orderDate: '2024-10-08T08:45:00Z',
    deliveryCompany: 'FedEx',
    url: 'https://api.example.com/webhook/8',
    errorTime: '2024-10-08T08:50:00Z',
    errorMessage: 'Payment gateway error',
    method: 'POST',
    webhookText: 'Payment gateway is down',
    nextAttemptTime: '2024-10-09T08:30:00Z',
    numberOfAttempts: 3,
    pickupId: 'pickup_08',
    createdDate: '2024-10-08T07:30:00Z',
    shipmentNumber: 'SHIP65432',
    status: 'Error',
    logStatus: 'Pending'
  },
  {
    id: 'log_009',
    orderId: 'order_109',
    orderDate: '2024-10-09T17:15:00Z',
    deliveryCompany: 'UPS',
    url: 'https://api.example.com/webhook/9',
    errorTime: '2024-10-09T17:20:00Z',
    errorMessage: 'Order canceled by user',
    method: 'POST',
    webhookText: 'Order was canceled',
    nextAttemptTime: '2024-10-10T17:00:00Z',
    numberOfAttempts: 1,
    pickupId: 'pickup_09',
    createdDate: '2024-10-09T16:00:00Z',
    shipmentNumber: 'SHIP23498',
    status: 'Canceled',
    logStatus: 'Completed'
  },
  {
    id: 'log_010',
    orderId: 'order_110',
    orderDate: '2024-10-10T16:00:00Z',
    deliveryCompany: 'DHL',
    url: 'https://api.example.com/webhook/10',
    errorTime: '2024-10-10T16:05:00Z',
    errorMessage: 'Unknown error',
    method: 'POST',
    webhookText: 'An unknown error occurred',
    nextAttemptTime: '2024-10-11T16:00:00Z',
    numberOfAttempts: 2,
    pickupId: 'pickup_10',
    createdDate: '2024-10-10T15:00:00Z',
    shipmentNumber: 'SHIP32145',
    status: 'Error',
    logStatus: 'Failed'
  }
]
