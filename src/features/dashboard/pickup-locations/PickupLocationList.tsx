'use client'
// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import StatisticCards from './StatisticCards'
import ViewTypeContext from '@/contexts/ViewTypeContext'
import { ViewTypeEnum } from '@/constants/layout-constants'
import { useContext, useEffect, useState } from 'react'
import { getPickupLocations } from '@/app/server/actions'
import { type PickupLocationType } from '@/types/pickupLocationTypes'
import PickupLocationListTable from './table-view/PickupLocationListTable'
import { Button, Typography } from '@mui/material'
import MapViewList from './map-view/MapViewList'
import AddLocationDialog from './add-pickupLocation-dialog'

const PickupLocationList = () => {
  const [pickupLocations, setPickupLocations] = useState<PickupLocationType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddLocationDialogOpen, setIsAddLocationDialogOpen] = useState(false)
  const { viewType, setViewType } = useContext(ViewTypeContext)

  // const data = await getEcommerceData()
  useEffect(() => {
    ;(async () => {
      const pickupLocations = await getPickupLocations()
      setPickupLocations(pickupLocations)
      setIsLoading(false)
    })()
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <div className='flex justify-between items-center mt-2 mb-6'>
          <Typography variant='h3' className='flex items-center font-semibold gap-2'>
            <i className='tabler-map-pin-up text-3xl'></i> <span>Pickup Locations</span>
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
              color='primary'
              className='max-sm:is-full'
              startIcon={<i className='tabler-plus' />}
              onClick={() => setIsAddLocationDialogOpen(true)}
            >
              Add Location
            </Button>
          </div>
        </div>
      </Grid>
      <Grid item xs={12}>
        <StatisticCards />
      </Grid>
      <Grid item xs={12}>
        {viewType == ViewTypeEnum.LIST_VIEW && (
          <PickupLocationListTable data={pickupLocations} setData={setPickupLocations} isLoading={isLoading} />
        )}
        {viewType == ViewTypeEnum.MAP_VIEW && <MapViewList pickupLocations={pickupLocations} />}
        <AddLocationDialog open={isAddLocationDialogOpen} setOpen={setIsAddLocationDialogOpen} />
      </Grid>
    </Grid>
  )
}

export default PickupLocationList
