import { useWarehouseStore } from '../../hooks/useWarehouseStore'
import DraggableItems from './DraggableItems'
import FloorConfig from './FloorConfig'
import WarehouseItemConfig from './WarehouseItemConfig'

export default function Toolbar() {
  const { floorSelected, selectedItemId } = useWarehouseStore()
  return (
    <div>
      {/* Add items to grag and drap  in a component here */}
      <DraggableItems />
      {!!selectedItemId && <WarehouseItemConfig />}
      {floorSelected && <FloorConfig />}
    </div>
  )
}
