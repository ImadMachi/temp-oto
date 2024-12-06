import { Typography } from '@mui/material'
import FloorResizer from './FloorResizer'

export default function FloorConfig() {
  return (
    <>
      <Typography variant='h6'>Floor Config</Typography>
      <FloorResizer label='Width' dimension={0} minThreshold={40} />
      <FloorResizer label='Length' dimension={2} minThreshold={40} />
    </>
  )
}
