/**
 * ! The server actions below are used to fetch the static data from the fake-db. If you're using an ORM
 * ! (Object-Relational Mapping) or a database, you can swap the code below with your own database queries.
 */

'use server'

// Data Imports
import { orders } from '@/fake-db/apps/orders'
import { categories, products } from '@/fake-db/apps/products'
import { pickupLocations } from '@/fake-db/apps/pickupLocation'
import { shippingPartners } from '@/fake-db/apps/shippingPartners'
import { salesChannels } from '@/fake-db/apps/salesChannels'
import { logs } from '@/fake-db/apps/log'

export const getLogs = async () => {
  return logs
}

export const getOrders = async () => {
  return orders
}

export const getProducts = async () => {
  return products
}

export const getCategories = async () => {
  return categories
}

export const getPickupLocations = async () => {
  return pickupLocations
}

export const getShippingPartners = async () => {
  return shippingPartners
}

export const getSalesChannels = async () => {
  return salesChannels
}
