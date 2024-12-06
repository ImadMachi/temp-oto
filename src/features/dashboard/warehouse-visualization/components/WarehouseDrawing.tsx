'use client'

import { Grid } from '@mui/material'
import Canvas from './Canvas'
import Toolbar from './toolbar/Toolbar'

export default function WarehouseDrawing() {
  return (
    <>
      <Grid container spacing={6} direction='row-reverse'>
        <Grid item xs={12} md={3}>
          <Toolbar />
        </Grid>
        <Grid item xs={12} md={9}>
          <Canvas />
        </Grid>
      </Grid>
    </>
  )
}
