'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { Button, DialogActions, DialogContent, Grid } from '@mui/material'
import CustomTextField from '@/@core/components/mui/TextField'

export type CategoryDataType = {
  name: string
  description: string
}

const initialData: CategoryDataType = {
  name: '',
  description: ''
}

type AddCategoryDialogProps = {
  categoryDialogState: 'add' | 'edit' | null
  setCategoryDialogState: React.Dispatch<React.SetStateAction<'add' | 'edit' | null>>
}
const AddCategoryDialog = ({ categoryDialogState, setCategoryDialogState }: AddCategoryDialogProps) => {
  // States
  const [categoryData, setCategoryData] = useState<CategoryDataType>(initialData)

  const handleClose = () => {
    setCategoryDialogState(null)
    setCategoryData(initialData)
  }

  const getDialogTitle = () => {
    if (categoryDialogState === 'add') {
      return 'Add Category'
    } else if (categoryDialogState === 'edit') {
      return 'Edit Category'
    }
  }
  return (
    <Dialog
      fullWidth
      open={!!categoryDialogState}
      onClose={handleClose}
      maxWidth='md'
      scroll='body'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogTitle variant='h4' className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        {getDialogTitle()}
      </DialogTitle>
      <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Category Name'
                placeholder='Ex: Electronics'
                value={categoryData.name}
                onChange={e => setCategoryData({ ...categoryData, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Description'
                placeholder='Ex: Electronics'
                value={categoryData.description}
                onChange={e => setCategoryData({ ...categoryData, description: e.target.value })}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
        <Button variant='contained' endIcon={<i className='tabler-chevron-right' />}>
          Submit
        </Button>
        <Button variant='tonal' color='secondary' type='reset' onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddCategoryDialog
