import { Grid } from '@mui/material'
import StatisticCards from './StatisticCards'
import ShipmentTypesCard from './ShipmentTypesCard'
import CitiesRankCard from './CitiesRankCard'
import OrdersNumberHistogramCard from './OrdersNumberHistogramCard'
import BasketSizeHistogramCard from './BasketSizeHistogramCard'
import SalesFilter from './SalesFilter'

export default function Sales() {
  return (
    <>
      <SalesFilter />
      <StatisticCards />
      <Grid container spacing={6} className='mt-0.5'>
        <Grid item xs={12} md={6}>
          <ShipmentTypesCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <CitiesRankCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <OrdersNumberHistogramCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <BasketSizeHistogramCard />
        </Grid>
      </Grid>
    </>
  )
}
