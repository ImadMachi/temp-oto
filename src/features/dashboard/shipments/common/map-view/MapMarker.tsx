import { Marker } from 'react-map-gl'
import { type OrderType } from '@/types/orderTypes'
import Image from 'next/image'

interface MapMarkerProps {
  order: OrderType
  setSelectedOrder: (order: OrderType | null) => void
}
export default function MapMarker({ order, setSelectedOrder }: MapMarkerProps) {
  // const [isPinCardVisible, setIsPinCardVisible] = useState(false)
  const handleMouseEnter = () => {
    setSelectedOrder(order)
  }
  const handleMouseLeave = () => {
    // setSelectedOrder(null)
  }

  return (
    <Marker longitude={order.coords.lng} latitude={order.coords.lat} style={{ display: 'flex' }}>
      <span className='cursor-pointer relative' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Image src='/images/icons/map-pin.png' alt='map-pin' width={20} height={27} />
      </span>
    </Marker>
  )
}
