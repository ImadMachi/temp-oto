import { Marker } from 'react-map-gl'
import type { WarehouseType } from '@/types/warehouseTypes'
import Image from 'next/image'

interface MapMarkerProps {
  warehouse: WarehouseType
  setSelectedWarehouse: (warehouse: WarehouseType | null) => void
}
export default function MapMarker({ warehouse, setSelectedWarehouse }: MapMarkerProps) {
  // Vars
  const [lat, lng] = warehouse.location.split(',')

  if (!lat || !lng) return null

  // Methods
  const handleMouseEnter = () => {
    setSelectedWarehouse(warehouse)
  }

  return (
    <Marker longitude={+lng} latitude={+lat} style={{ display: 'flex' }}>
      <span className='cursor-pointer relative' onMouseEnter={handleMouseEnter}>
        <Image src='/images/icons/map-pin.png' alt='map-pin' width={20} height={27} />
      </span>
    </Marker>
  )
}
