import { Chip, Typography } from '@mui/material'
import { type WarehouseType } from '@/types/warehouseTypes'
import { statusChipColor } from '../utils/helpers'
import ActionMenu from './ActionMenu'

interface MapPinCardProps {
  warehouse: WarehouseType
  setSelectedWarehouse: (warehouse: WarehouseType | null) => void
  setDeleteDialogOpen: (open: boolean) => void
  setEditDialogOpen: (open: boolean) => void
}
export default function MapPinCard({
  warehouse,
  setSelectedWarehouse,
  setDeleteDialogOpen,
  setEditDialogOpen
}: MapPinCardProps) {
  return (
    <div className='p-2'>
      <div className='flex items-center justify-between gap-2'>
        <Typography className='font-bold '>{warehouse.name}</Typography>
        <ActionMenu
          warehouse={warehouse}
          setDeleteDialogOpen={setDeleteDialogOpen}
          setSelectedWarehouse={setSelectedWarehouse}
          setEditDialogOpen={setEditDialogOpen}
        />
      </div>
      <div className='flex justify-between mt-4 gap-8'>
        <div className='basis-1/2'>
          <Chip
            label={warehouse.status}
            color={statusChipColor[warehouse.status]?.color}
            variant='outlined'
            size='small'
          />
        </div>
      </div>
    </div>
  )
}
