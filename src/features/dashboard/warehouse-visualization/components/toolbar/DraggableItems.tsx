import { Typography } from '@mui/material'
import Rack2d from '../warehouse-items/Rack2D'

export default function DraggableItems() {
  return (
    <div className='mb-4'>
      <Typography variant='h6' className='mb-2'>
        Draggable Items
      </Typography>
      <Rack2d width={80} height={100} shelfCount={3} />
    </div>
  )
}
