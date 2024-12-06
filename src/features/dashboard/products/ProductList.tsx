'use client'

import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import StatisticCards from './StatisticCards'
import { getProducts } from '@/app/server/actions'
import type { ProductListType } from '@/types/productTypes'
import BulkAction from './BulkAction'
import ActionMenu from './ActionMenu'
import ProductListTable from './ProductListTable'

export default function ProductList() {
  const [products, setProducts] = useState<ProductListType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const products = await getProducts()
      setProducts(products)
      setIsLoading(false)
    })()
  }, [])
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <StatisticCards />
      </Grid>
      <Grid item xs={12}>
        <ProductListTable data={products} setData={setProducts} isLoading={isLoading}>
          {{
            bulkAction: BulkAction,
            actionMenu: ActionMenu
          }}
        </ProductListTable>
      </Grid>
    </Grid>
  )
}
