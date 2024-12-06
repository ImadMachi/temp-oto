'use client'

import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { getCategories } from '@/app/server/actions'
import type { CategoryType } from '@/types/productTypes'
import BulkAction from './BulkAction'
import ActionMenu from './ActionMenu'
import CategoryListTable from './CategoryListTable'

export default function CategoryList() {
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const categories = await getCategories()
      setCategories(categories)
      setIsLoading(false)
    })()
  }, [])
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}>
        <CategoryListTable data={categories} setData={setCategories} isLoading={isLoading}>
          {{
            bulkAction: BulkAction,
            actionMenu: ActionMenu
          }}
        </CategoryListTable>
      </Grid>
    </Grid>
  )
}
