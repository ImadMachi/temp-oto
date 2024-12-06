'use client'

import { useRef, useState } from 'react'
import { Map, Popup } from 'react-map-gl'
import type { MapRef } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import '../add-order-dialog/mapStyles.css'
import { type OrderType } from '@/types/orderTypes'
import { Box, Card, CardContent, useColorScheme } from '@mui/material'
import MapMarker from './MapMarker'
import MapPinCard from './MapPinCard'
import { type ActionMenuProps } from '../table-view/OrderListTable'

const accessToken = process.env.NEXT_PUBLIC_MAP_BOX_TOKEN

interface MapViewListProps {
  orders: OrderType[]
  actionMenu: (props: ActionMenuProps) => JSX.Element
}
export default function MapViewList({ orders, actionMenu }: MapViewListProps) {
  // Hooks
  const mapRef = useRef<MapRef>()
  const { mode } = useColorScheme()

  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null)

  return (
    <Card>
      <CardContent>
        <Map
          mapboxAccessToken={accessToken}
          // eslint-disable-next-line lines-around-comment
          // @ts-ignore
          ref={mapRef}
          mapStyle={mode === 'dark' ? 'mapbox://styles/mapbox/dark-v10' : 'mapbox://styles/mapbox/light-v9'}
          attributionControl={false}
          reuseMaps
          style={{ width: '100%', height: '25rem' }}
        >
          {orders.map((order, index) => (
            <MapMarker key={index} order={order} setSelectedOrder={setSelectedOrder} />
          ))}
          {!!selectedOrder && (
            <Box component='div'>
              <Popup
                longitude={selectedOrder.coords.lng}
                latitude={selectedOrder.coords.lat}
                onClose={() => setSelectedOrder(null)}
                anchor='bottom'
              >
                <MapPinCard order={selectedOrder} actionMenu={actionMenu} />
              </Popup>
            </Box>
          )}
        </Map>
      </CardContent>
    </Card>
  )
}
