import { Button, Chip, DialogActions, DialogContent, Grid, InputLabel, Switch, Typography } from '@mui/material'
import { useState, type ChangeEvent } from 'react'
import { useTheme } from '@mui/material/styles'
import classnames from 'classnames'
import { pricingPlans } from '@/data/pricing'
import DirectionalIcon from '@components/DirectionalIcon'
import PlanDetailsCard from './PlanDetailsCard'
import type { PricingPlanType } from '@/types/pricingTypes'

interface SelectPlanTabProps {
  setTabValue: (value: string) => void
  handleClose: () => void
}
export default function SelectPlanTab({ setTabValue, handleClose }: SelectPlanTabProps) {
  // States
  const [pricingPlan, setPricingPlan] = useState<'monthly' | 'annually'>('annually')
  const [selectedPlan, setSelectedPlan] = useState<PricingPlanType | null>(pricingPlans[0])

  // Hooks
  const theme = useTheme()

  const handleChange = (e: ChangeEvent<{ checked: boolean }>) => {
    if (e.target.checked) {
      setPricingPlan('annually')
    } else {
      setPricingPlan('monthly')
    }
  }

  return (
    <>
      <DialogContent className='overflow-visible pbs-0 sm:pli-16 '>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Typography variant='h3'>Pricing Plans</Typography>
            <div className='flex items-center text-center flex-col  sm:mbe-[3.8rem]'>
              <Typography>
                All plans include 40+ advanced tools and features to boost your sales. Choose the best plan to fit your
                needs.
              </Typography>
            </div>
            <div className='flex justify-center items-center relative mbs-0.5'>
              <InputLabel htmlFor='pricing-switch' className='cursor-pointer'>
                Monthly
              </InputLabel>
              <Switch id='pricing-switch' onChange={handleChange} checked={pricingPlan === 'annually'} />
              <InputLabel htmlFor='pricing-switch' className='cursor-pointer'>
                Annually
              </InputLabel>

              <div
                className={classnames('flex absolute max-sm:hidden block-start-[-39px] translate-x-[35%]', {
                  'right-full': theme.direction === 'rtl',
                  'left-1/2': theme.direction !== 'rtl'
                })}
              >
                <DirectionalIcon
                  ltrIconClass='tabler-corner-left-down'
                  rtlIconClass='tabler-corner-right-down'
                  className='mbs-2 mie-1 text-textDisabled'
                />
                <Chip label='Save up to 10%' size='small' variant='tonal' color='primary' />
              </div>
            </div>
          </div>
          <Grid container spacing={6}>
            {pricingPlans.map((plan, index) => (
              <Grid item xs={12} md={4} key={index}>
                <PlanDetailsCard
                  data={plan}
                  pricingPlan={pricingPlan}
                  selectedPlan={selectedPlan}
                  setSelectedPlan={setSelectedPlan}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </DialogContent>
      <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16 mt-4'>
        <Button variant='tonal' color='secondary' type='reset' onClick={handleClose}>
          Cancel
        </Button>
        <Button
          onClick={() => setTabValue('confirm-plan')}
          variant='contained'
          endIcon={<i className='tabler-chevron-right' />}
        >
          Continue
        </Button>
      </DialogActions>
    </>
  )
}
