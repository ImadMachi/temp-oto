import { IconButton, Menu, MenuItem, Typography } from '@mui/material'
import DimensionResizer from './DimensionResizer'
import { findNearestEmptyPosition, isAtEdge, isColliding, isDockItem, isRackItem } from '../../utils/helpers'
import Switcher from './Switcher'
import { useState } from 'react'
import { useWarehouseStore } from '../../hooks/useWarehouseStore'
import { toast } from 'react-toastify'
import type { Vector3 } from '../../types/WarehouseItemTypes'
import ThicknessCounter from './ThicknessCounter'
import ShelfCounter from './ShelfCounter'

export default function WarehouseItemConfig() {
  // States
  const [isDuplicating, setIsDuplicating] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | Element>(null)
  const isConfirmDeleteMenuOpen = Boolean(anchorEl)

  // Hooks
  const { selectedItemId, setWarehouseItems, setSelectedItemId, floorDimensions } = useWarehouseStore()

  // Vars
  const selectedItem = useWarehouseStore.getState().warehouseItems.find(item => item.id == selectedItemId)

  // Methods
  const handleRotateItem = () => {
    if (!selectedItemId) return

    const newItems = useWarehouseStore.getState().warehouseItems.map(item => {
      if (item.id === selectedItemId) {
        // Rotate Y by cycling through 0, 90, 180, and 270 degrees (in radians)
        const currentYRotation = item.rotation[1]
        const newYRotation =
          currentYRotation === 0
            ? Math.PI / 2 // 90 degrees
            : currentYRotation === Math.PI / 2
              ? Math.PI // 180 degrees
              : currentYRotation === Math.PI
                ? (3 * Math.PI) / 2 // 270 degrees
                : 0 // back to 0 degrees

        // Calculate the new position after rotation
        const updatedItem = structuredClone(item)
        const newRotation = [item.rotation[0], newYRotation, item.rotation[2]]
        updatedItem.rotation = newRotation as Vector3
        if (!isColliding(updatedItem) && !isAtEdge(updatedItem, floorDimensions[0], floorDimensions[2])) {
          return updatedItem
        } else {
          return item
        }
      }
      return item
    })

    setWarehouseItems(newItems)
  }

  const handleDeleteItem = () => {
    const filteredItems = useWarehouseStore.getState().warehouseItems.filter(item => item.id != selectedItemId)
    setWarehouseItems(filteredItems)
    setSelectedItemId(null)
  }

  function handleDuplicate() {
    setIsDuplicating(true)
    const selectedItem = useWarehouseStore.getState().warehouseItems.find(item => item.id === selectedItemId)
    if (!selectedItem) return setIsDuplicating(false)

    const [floorWidth, , floorDepth] = useWarehouseStore.getState().floorDimensions
    const newPosition = findNearestEmptyPosition(selectedItem, floorWidth, floorDepth)

    if (newPosition) {
      const newItem = {
        ...selectedItem,
        id: Date.now(),
        position: newPosition as Vector3
      }
      setWarehouseItems([...useWarehouseStore.getState().warehouseItems, newItem])
      setSelectedItemId(newItem.id)
    } else {
      toast.error('No empty space available for duplicating the item', {
        position: 'top-center'
      })
    }

    setIsDuplicating(false)
  }

  if (!selectedItem) return <></>
  return (
    <>
      <div className='flex justify-between items-center'>
        <Typography variant='h6'>Item details</Typography>
        <div>
          <IconButton onClick={handleRotateItem} title='Rotate'>
            <i className='tabler-rotate' />
          </IconButton>
          <IconButton onClick={handleDuplicate} color='primary' title='Duplicate' disabled={isDuplicating}>
            <i className='tabler-copy' />
          </IconButton>
          <IconButton onClick={e => setAnchorEl(e.currentTarget)} color='error' title='Delete'>
            <i className='tabler-trash' />
          </IconButton>
          <Menu open={isConfirmDeleteMenuOpen} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={handleDeleteItem}>confirm delete</MenuItem>
          </Menu>
        </div>
      </div>
      <Typography color='text.secondary' variant='body1'>
        Dimensions
      </Typography>
      <DimensionResizer label='Width' dimension={0} minThreshold={4} />
      <DimensionResizer label='Height' dimension={1} minThreshold={3} />
      <DimensionResizer label='Depth' dimension={2} minThreshold={1} />
      <Typography color='text.secondary' variant='body1' className='mt-2'>
        Properties
      </Typography>
      <ThicknessCounter minThreshold={0.1} maxThreshold={1} step={0.1} />
      <ShelfCounter minThreshold={3} maxThreshold={4} />
      <Switcher label='Door open' attribute='doorOpen' />
      <Switcher label='Is Occupied' attribute='isOccupied' />
    </>
  )
}
