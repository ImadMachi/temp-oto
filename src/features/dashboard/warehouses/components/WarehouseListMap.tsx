'use client'

import { useRef, useState } from 'react'
import { Map, Popup } from 'react-map-gl'
import type { MapRef } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Box, Card, CardContent, useColorScheme } from '@mui/material'
import MapMarker from './MapMarker'
import type { WarehouseType } from '@/types/warehouseTypes'
import useWarehouses from '../hooks/useWarehouses'
import MapPinCard from './MapPinCard'
import DeleteWarehouseDialog from './DeleteWarehouseDialog'
import EditWarehouseDrawer from './EditWarehouseDrawer'

const accessToken = process.env.NEXT_PUBLIC_MAP_BOX_TOKEN

interface WarehouseListMapProps {}
export default function WarehouseListMap({}: WarehouseListMapProps) {
  // States
  const [selectedWarehouse, setSelectedWarehouse] = useState<WarehouseType | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  // Vars
  const [lat, lng] = selectedWarehouse?.location.split(',') || [null, null]

  // Hooks
  const mapRef = useRef<MapRef>()
  const { mode } = useColorScheme()
  const { data: warehouses } = useWarehouses()

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
          {warehouses?.map(warehouse => (
            <MapMarker key={warehouse.id} warehouse={warehouse} setSelectedWarehouse={setSelectedWarehouse} />
          ))}
          {!!selectedWarehouse && !!lat && !!lng && (
            <Box component='div'>
              <Popup longitude={+lng} latitude={+lat} onClose={() => setSelectedWarehouse(null)} anchor='bottom'>
                <MapPinCard
                  warehouse={selectedWarehouse}
                  setSelectedWarehouse={setSelectedWarehouse}
                  setDeleteDialogOpen={setDeleteDialogOpen}
                  setEditDialogOpen={setEditDialogOpen}
                />
              </Popup>
            </Box>
          )}
        </Map>
      </CardContent>

      {deleteDialogOpen && selectedWarehouse && (
        <DeleteWarehouseDialog
          selectedWarehouse={selectedWarehouse}
          setSelectedWarehouse={setSelectedWarehouse}
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
        />
      )}

      {editDialogOpen && selectedWarehouse && (
        <EditWarehouseDrawer open={editDialogOpen} setOpen={setEditDialogOpen} selectedWarehouse={selectedWarehouse} />
      )}
    </Card>
  )
}
