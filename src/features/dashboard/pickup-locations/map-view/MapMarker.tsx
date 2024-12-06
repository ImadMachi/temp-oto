import { Marker } from 'react-map-gl'
import type { PickupLocationType } from '@/types/pickupLocationTypes'
import Image from 'next/image'

interface MapMarkerProps {
  pickupLocation: PickupLocationType
  setSelectedPickupLocation: (pickupLocation: PickupLocationType | null) => void
}
export default function MapMarker({ pickupLocation, setSelectedPickupLocation }: MapMarkerProps) {
  // const [isPinCardVisible, setIsPinCardVisible] = useState(false)
  const handleMouseEnter = () => {
    setSelectedPickupLocation(pickupLocation)
  }
  const handleMouseLeave = () => {
    // setSelectedPickupLocation(null)
  }

  return (
    <Marker longitude={pickupLocation.coords.lng} latitude={pickupLocation.coords.lat} style={{ display: 'flex' }}>
      <span className='cursor-pointer relative' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Image src='/images/icons/map-pin.png' alt='map-pin' width={20} height={27} />
      </span>
    </Marker>
  )
}
