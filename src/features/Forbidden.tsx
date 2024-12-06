import Typography from '@mui/material/Typography'

const Forbidden = () => {
  return (
    <div className='flex items-center justify-center min-bs-[80dvh] relative p-6 overflow-x-hidden'>
      <div className='flex items-center flex-col text-center'>
        <div className='flex flex-col gap-2 is-[90vw] sm:is-[unset] mbe-6'>
          <Typography className='font-medium text-8xl' color='text.primary'>
            403
          </Typography>
          <Typography variant='h4'>Forbidden ⚠️</Typography>
          <Typography>You don&#39;t have permission to access this page.</Typography>
        </div>
      </div>
    </div>
  )
}

export default Forbidden
