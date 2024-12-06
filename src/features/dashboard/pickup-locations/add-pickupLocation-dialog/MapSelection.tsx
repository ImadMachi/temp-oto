import { useRef, useEffect, useState } from 'react'
import { Map, Marker } from 'react-map-gl'
import type { MapMouseEvent, MapRef } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { LocationDataType } from '.'
import './mapStyles.css'
import Image from 'next/image'
import axios from 'axios'

export type viewStateType = {
  longitude: number
  latitude: number
  zoom: number
}

interface MapSelectionProps {
  locationData: LocationDataType
  setLocationData: React.Dispatch<React.SetStateAction<LocationDataType>>
}

const accessToken = process.env.NEXT_PUBLIC_MAP_BOX_TOKEN

export default function MapSelection({ locationData, setLocationData }: MapSelectionProps) {
  // Hooks
  const mapRef = useRef<MapRef>()

  const [viewState, setViewState] = useState<viewStateType>({
    longitude: 46.738586,
    latitude: 24.7136,
    zoom: 12.5
  })

  useEffect(() => {
    mapRef.current?.flyTo({ center: [viewState.longitude, viewState.latitude], zoom: 16 })
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
        const city = context.place?.name
        const zipCode = context.postcode?.name
        const addressLine = context.address?.name

        setLocationData({ ...locationData, country, state, city, zipCode, addressLine })
      }
    } catch (error) {
      console.error('Error fetching address:', error)
    }
  }

  const handleChangeLocation = (e: MapMouseEvent) => {
    getGeoLocationByLngAndLat(e.lngLat.lng, e.lngLat.lat)
    setViewState({ ...viewState, longitude: e.lngLat.lng, latitude: e.lngLat.lat })
  }

  return (
    <div className='is-full bs-full mb-6'>
      {/* <TempMap /> */}
      <Map
        mapboxAccessToken={accessToken}
        // eslint-disable-next-line lines-around-comment
        // @ts-ignore
        ref={mapRef}
        initialViewState={viewState}
        mapStyle='mapbox://styles/mapbox/light-v9'
        attributionControl={false}
        reuseMaps
        style={{ width: '100%', height: '15rem' }}
        onClick={handleChangeLocation}
      >
        {/* {geojson.features.map((item, index) => {
          return (
            <Marker
              key={index}
              longitude={item.geometry.longitude}
              latitude={item.geometry.latitude}
              style={{ display: 'flex' }}
            >
              <span>
                <Image src='/images/icons/map-pin.png' alt='truck' width={30} height={40} />
              </span>
            </Marker>
          )
        })} */}
        <Marker longitude={viewState.longitude} latitude={viewState.latitude} style={{ display: 'flex' }}>
          <span>
            <Image src='/images/icons/map-pin.png' alt='truck' width={30} height={40} />
          </span>
        </Marker>
      </Map>
    </div>
  )
}
