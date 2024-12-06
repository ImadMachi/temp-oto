'use client'
import { ViewTypeEnum } from '@/constants/layout-constants'
import ViewTypeContext from '@/contexts/ViewTypeContext'
import AddOrderDialog from '@/features/dashboard/shipments/common/add-order-dialog'
import ShipmentTabsNav from '@/features/dashboard/shipments/ShipmentTabsNav'
import { Button, Typography } from '@mui/material'
import { useContext, useState } from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isAddOrderDialogOpen, setIsAddOrderDialogOpen] = useState(false)
  const { viewType, setViewType } = useContext(ViewTypeContext)

  return (
    <>
      <div className='flex justify-between items-center mt-2 mb-6'>
        <Typography variant='h3' className='flex items-center font-semibold gap-2'>
          <i className='tabler-package-import text-3xl'></i> <span>Shipments</span>
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
            onClick={() => setIsAddOrderDialogOpen(true)}
          >
            Add Order
          </Button>
        </div>
      </div>
      <ShipmentTabsNav>{children}</ShipmentTabsNav>
      <AddOrderDialog open={isAddOrderDialogOpen} setOpen={setIsAddOrderDialogOpen} />
    </>
  )
}

export default Layout
