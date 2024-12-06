import { useRef, useEffect, useState } from 'react'
import { Map, Marker } from 'react-map-gl'
import type { MapMouseEvent } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Image from 'next/image'
import axios from 'axios'
import { useColorScheme } from '@mui/material'
import type { WarehouseSchemaType } from './AddWarehouseDrawer'
import type { UseFormSetValue } from 'react-hook-form'
import { toast } from 'react-toastify'

export type viewStateType = {
  longitude: number
  latitude: number
  zoom: number
}

interface MapSelectionProps {
  setValue: UseFormSetValue<WarehouseSchemaType>
  latitude?: string
  longitude?: string
}

const accessToken = process.env.NEXT_PUBLIC_MAP_BOX_TOKEN

export default function MapSelection({ setValue, latitude, longitude }: MapSelectionProps) {
  // State
  const [viewState, setViewState] = useState<viewStateType>({
    longitude: longitude ? +longitude : 0,
    latitude: latitude ? +latitude : 0,
    zoom: 1
  })

  // Hooks
  const mapRef = useRef<any>()
  const { mode } = useColorScheme()

  useEffect(() => {
    mapRef.current?.flyTo({ center: [viewState.longitude, viewState.latitude], zoom: 12 })
  }, [viewState])

  const getGeoLocationByLngAndLat = async (lng: number, lat: number) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${lng}&latitude=${lat}`,
        {
          params: {
            access_token: accessToken
          }
        }
      )

      if (response.data && response.data.features && response.data.features.length > 0) {
        const context = response.data.features[0].properties.context

        const country = context.country?.name
        const state = context.region?.name
        const city = context.place?.name || context.region?.name
        const zipCode = context.postcode?.name
        let addressLine = context.address?.name || context.street?.name || context.locality?.name
        if (context.neighborhood?.name) {
          addressLine += `, ${context.neighborhood?.name}`
        }

        setValue('country', country || '', { shouldValidate: true })
        setValue('state', state || '', { shouldValidate: true })
        setValue('city', city || '', { shouldValidate: true })
        setValue('zip_code', zipCode || '', { shouldValidate: true })
        setValue('address', addressLine || '', { shouldValidate: true })
        setValue('latitude', `${lat}`, { shouldValidate: true })
        setValue('longitude', `${lng}`, { shouldValidate: true })
      }
    } catch (error) {
      toast.error('Error fetching location')
    }
  }

  const handleChangeLocation = (e: MapMouseEvent) => {
    getGeoLocationByLngAndLat(e.lngLat.lng, e.lngLat.lat)
    setViewState({ ...viewState, longitude: e.lngLat.lng, latitude: e.lngLat.lat })
  }

  return (
    <div className='is-full bs-full my-3'>
      <Map
        mapboxAccessToken={accessToken}
        ref={mapRef}
        initialViewState={viewState}
        mapStyle={mode === 'dark' ? 'mapbox://styles/mapbox/dark-v10' : 'mapbox://styles/mapbox/light-v9'}
        attributionControl={false}
        reuseMaps
        style={{ width: '100%', height: '15rem' }}
        onClick={handleChangeLocation}
      >
        <Marker
          longitude={viewState.longitude}
          latitude={viewState.latitude}
          style={{ display: viewState.latitude ? 'flex' : 'none' }}
        >
          <span>
            <Image src='/images/icons/map-pin.png' alt='truck' width={30} height={40} />
          </span>
        </Marker>
      </Map>
    </div>
  )
}
