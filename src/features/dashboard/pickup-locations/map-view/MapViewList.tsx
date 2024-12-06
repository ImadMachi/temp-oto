'use client'

import { useRef, useState } from 'react'
import { Map, Popup } from 'react-map-gl'
import type { MapRef } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import '../add-pickupLocation-dialog/mapStyles.css'
import { Box, Card, CardContent, useColorScheme } from '@mui/material'
import MapMarker from './MapMarker'
import MapPinCard from './MapPinCard'
import { type PickupLocationType } from '@/types/pickupLocationTypes'

const accessToken = process.env.NEXT_PUBLIC_MAP_BOX_TOKEN

interface MapViewListProps {
  pickupLocations: PickupLocationType[]
}
export default function MapViewList({ pickupLocations }: MapViewListProps) {
  // Hooks
  const mapRef = useRef<MapRef>()
  const { mode } = useColorScheme()

  const [selectedPickupLocation, setSelectedPickupLocation] = useState<PickupLocationType | null>(null)

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
          {pickupLocations.map((pickupLocation, index) => (
            <MapMarker
              key={index}
              pickupLocation={pickupLocation}
              setSelectedPickupLocation={setSelectedPickupLocation}
            />
          ))}
          {!!selectedPickupLocation && (
            <Box component='div'>
              <Popup
                longitude={selectedPickupLocation.coords.lng}
                latitude={selectedPickupLocation.coords.lat}
                onClose={() => setSelectedPickupLocation(null)}
                anchor='bottom'
              >
                <MapPinCard pickupLocation={selectedPickupLocation} />
              </Popup>
            </Box>
          )}
        </Map>
      </CardContent>
    </Card>
  )
}
