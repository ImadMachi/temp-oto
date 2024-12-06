'use client'

// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import WarehouseListTable from './WarehouseListTable'
import { Button, Card, Typography } from '@mui/material'
import { ViewTypeEnum } from '@/constants/layout-constants'
import { useContext, useState } from 'react'
import ViewTypeContext from '@/contexts/ViewTypeContext'
import AddWarehouseDrawer from './AddWarehouseDrawer'
import WarehouseListMap from './WarehouseListMap'

const WarehouseList = () => {
  // States
  const [addDrawerOpen, setAddDrawerOpen] = useState(false)

  // Hooks
  const { viewType, setViewType } = useContext(ViewTypeContext)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <div className='mb-2'>
          <div className='flex justify-between flex-col items-start md:flex-row md:items-center gap-4 p-6'>
            <Typography variant='h3' className='flex items-center font-semibold gap-2 '>
              <i className='tabler-map-pin-up text-3xl'></i> <span>Warehouses</span>
            </Typography>
            <div className='flex items-center'>
              {viewType === ViewTypeEnum.LIST_VIEW && (
                <Button className='mr-4' onClick={() => setViewType(ViewTypeEnum.MAP_VIEW)}>
                  <i className='tabler-map mr-2' /> Map View
                </Button>
              )}
              {viewType === ViewTypeEnum.MAP_VIEW && (
                <Button className='mr-4' onClick={() => setViewType(ViewTypeEnum.LIST_VIEW)}>
                  <i className='tabler-list mr-2' /> List View
                </Button>
              )}
              <Button
                variant='contained'
                startIcon={<i className='tabler-plus' />}
                onClick={() => setAddDrawerOpen(true)}
                className='max-sm:is-full'
              >
                Add New Warehouse
              </Button>
            </div>
          </div>
        </div>
        {viewType == ViewTypeEnum.LIST_VIEW && <WarehouseListTable />}
        {viewType == ViewTypeEnum.MAP_VIEW && <WarehouseListMap />}

        {addDrawerOpen && <AddWarehouseDrawer open={addDrawerOpen} setOpen={setAddDrawerOpen} />}
      </Grid>
    </Grid>
  )
}

export default WarehouseList
