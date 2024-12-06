import { Grid } from '@mui/material'
import PendingOrdersCard from './PendingOrdersCard'
import ClosedOrdersCard from './ClosedOrdersCard'
import ProcessingOrdersCard from './ProcessingOrdersCard'
import PaymentMethodsCard from './PaymentMethodsCard'
import DeliveryCompaniesCard from './DeliveryCompaniesCard'
import AssignedVsFulfilledCard from './AssignedVsFulfilledCard'
import OverviewFilter from './OverviewFilter'

export default function Overview() {
  return (
    <>
      <OverviewFilter />
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <PendingOrdersCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <ClosedOrdersCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProcessingOrdersCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <PaymentMethodsCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <DeliveryCompaniesCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <AssignedVsFulfilledCard />
        </Grid>
      </Grid>
    </>
  )
}
