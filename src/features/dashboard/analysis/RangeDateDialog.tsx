import AppReactDatepicker from '@/components/AppReactDatePicker'
import { Dialog } from '@mui/material'
import { forwardRef } from 'react'
import { format, addDays } from 'date-fns'

import type { TextFieldProps } from '@mui/material/TextField'
import CustomTextField from '@/@core/components/mui/TextField'

type CustomInputProps = TextFieldProps & {
  label: string
  end: Date | number
  start: Date | number
}

interface RangeDateDialogProps {
  open: boolean
  handleClose: () => void
  customDates: { start: Date | undefined; end: Date | undefined }
  setCustomDates: React.Dispatch<React.SetStateAction<{ start: Date | undefined; end: Date | undefined }>>
}
export default function RangeDateDialog({ open, handleClose, customDates, setCustomDates }: RangeDateDialogProps) {
  // Vars
  const CustomInput = forwardRef((props: CustomInputProps, ref) => {
    const { label, start, end, ...rest } = props

    const startDate = format(start || new Date(), 'MM/dd/yyyy')
    const endDate = !!end ? ` - ${format(end, 'MM/dd/yyyy')}` : null

    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return <CustomTextField fullWidth inputRef={ref} {...rest} label={label} value={value} />
  })

  // Methods
  const handleOnChange = (dates: any) => {
    const [start, end] = dates
    setCustomDates({ start, end })
    if (start && end) handleClose()
  }
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      maxWidth='xs'
      scroll='body'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible', width: '200px' } }}
    >
      <AppReactDatepicker
        selectsRange
        endDate={customDates.end}
        selected={customDates.start}
        startDate={customDates.start}
        id='date-range-picker'
        onChange={handleOnChange}
        shouldCloseOnSelect={false}
        open={true}
        customInput={
          <CustomInput label='' start={customDates.start as Date | number} end={customDates.end as Date | number} />
        }
      />
    </Dialog>
  )
}
