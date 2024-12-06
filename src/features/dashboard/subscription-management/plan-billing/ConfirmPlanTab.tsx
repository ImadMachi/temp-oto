import { Button, DialogActions, DialogContent, Input, Typography } from '@mui/material'

interface ConfirmPlanTabProps {
  setTabValue: (value: string) => void
  handleClose: () => void
}
export default function ConfirmPlanTab({ setTabValue, handleClose }: ConfirmPlanTabProps) {
  return (
    <>
      <DialogContent className='overflow-visible pbs-0 sm:pli-16 max-w-xl mx-auto'>
        <Typography variant='h5' className='text-center my-4'>
          Upgrade to Standard Plan
        </Typography>
        <div className='flex justify-between items-center shadow bg-gray-100 rounded p-4 mb-3'>
          <div>
            <Typography variant='body1' color='text.secondary'>
              Basic Plan
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Current
            </Typography>
          </div>
          <Typography variant='body2' color='text.secondary'>
            0 SAR/Month
          </Typography>
        </div>
        <div className='flex justify-between items-center shadow bg-primaryLight rounded p-4 border border-primary mb-3'>
          <div>
            <Typography variant='body1' color='text.primary'>
              Standard Plan
            </Typography>
            <Typography variant='body2' className='text-primary'>
              New
            </Typography>
          </div>
          <Typography variant='body2' color='text.primary'>
            49 SAR/Month
          </Typography>
        </div>
        <div className='border border-primary p-2 rounded mb-3'>
          <Typography className='text-xs'>
            Your new plan will start today on 11/10/2024. Note that we automatically renew your subscription if not
            canceled before the renewal date.
          </Typography>
        </div>
        <div className='flex items-center gap-2 border border-gray-200 rounded mb-3'>
          <Input placeholder='Coupon code' fullWidth className='p-2 box-border' disableUnderline />
          <Button variant='outlined'>Apply</Button>
        </div>
      </DialogContent>
      <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16 mt-4'>
        <Button variant='tonal' color='secondary' type='reset' onClick={handleClose}>
          Cancel
        </Button>
        <Button
          onClick={() => setTabValue('select-plan')}
          variant='outlined'
          startIcon={<i className='tabler-chevron-left' />}
        >
          Previous
        </Button>
        <Button
          onClick={() => setTabValue('select-payment')}
          variant='contained'
          endIcon={<i className='tabler-chevron-right' />}
        >
          Continue
        </Button>
      </DialogActions>
    </>
  )
}
