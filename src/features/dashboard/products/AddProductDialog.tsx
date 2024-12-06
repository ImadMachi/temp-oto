'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { Button, DialogActions, DialogContent, Grid, InputLabel, MenuItem, Typography } from '@mui/material'
import CustomTextField from '@/@core/components/mui/TextField'
import DropProductImage from './DropProductImage'

const currencies = ['SAR', 'USD', 'EUR']
const categories = ['Electronics', 'Accessories', 'Furniture', 'Clothes']

export type ProductDataType = {
  name: string
  description: string
  sku: string
  price: number | null
  currency: string
  taxAmount: number | null
  barcode: string
  category: string
  volume: number
  length: number
  width: number
  height: number
  weight: number
  imageUrl: string
}

const initialData: ProductDataType = {
  name: '',
  description: '',
  sku: '',
  price: null,
  currency: 'SAR',
  taxAmount: null,
  barcode: '',
  category: '',
  volume: 0,
  length: 0,
  width: 0,
  height: 0,
  weight: 0,
  imageUrl: ''
}

type AddProductDialogProps = {
  productDialogState: 'add' | 'edit' | 'view' | null
  setProductDialogState: React.Dispatch<React.SetStateAction<'add' | 'edit' | 'view' | null>>
}
const AddProductDialog = ({ productDialogState, setProductDialogState }: AddProductDialogProps) => {
  // States
  const [productData, setProductData] = useState<ProductDataType>(initialData)

  const handleClose = () => {
    setProductDialogState(null)
    setProductData(initialData)
  }
  const isView = productDialogState === 'view'

  const getDialogTitle = () => {
    if (productDialogState === 'view') {
      return 'View Product'
    } else if (productDialogState === 'add') {
      return 'Add Product'
    } else if (productDialogState === 'edit') {
      return 'Edit Product'
    }
  }
  return (
    <Dialog
      fullWidth
      open={!!productDialogState}
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
                label='Product Name'
                placeholder='Ex: Phone'
                value={productData.name}
                onChange={e => setProductData({ ...productData, name: e.target.value })}
                disabled={isView}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='SKU'
                placeholder='123-456-789'
                value={productData.sku}
                onChange={e => setProductData({ ...productData, sku: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6} className='flex items-end'>
              <CustomTextField
                fullWidth
                label='Price'
                placeholder='Ex: 100.00'
                type='number'
                value={productData.price}
                onChange={e => setProductData({ ...productData, price: e.target.value as unknown as number })}
              />
              <CustomTextField
                select
                className='min-w-20 ml-1'
                value={productData.currency}
                onChange={e => setProductData({ ...productData, currency: e.target.value as string })}
              >
                {currencies.map((currency, index) => (
                  <MenuItem key={index} value={currency}>
                    {currency}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6} className='flex items-end'>
              <CustomTextField
                fullWidth
                label='Tax Amount'
                placeholder='Ex: 10.00'
                type='number'
                value={productData.taxAmount}
                onChange={e => setProductData({ ...productData, taxAmount: e.target.value as unknown as number })}
              />
              <CustomTextField
                select
                className='min-w-20 ml-1'
                value={productData.currency}
                onChange={e => setProductData({ ...productData, currency: e.target.value as string })}
              >
                {currencies.map((currency, index) => (
                  <MenuItem key={index} value={currency}>
                    {currency}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Barcode'
                placeholder='123-456-789'
                value={productData.barcode}
                onChange={e => setProductData({ ...productData, barcode: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                select
                fullWidth
                label='Category'
                value={productData.category}
                onChange={e => setProductData({ ...productData, category: e.target.value as string })}
              >
                {categories.map((category, index) => (
                  <MenuItem key={index} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                multiline
                rows={2}
                label='Description'
                placeholder='Ex: Color, Size, Weight, ...'
                value={productData.description}
                onChange={e => setProductData({ ...productData, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <CustomTextField
                fullWidth
                label='Volume (cm3)'
                placeholder='Ex: 100'
                type='number'
                value={productData.volume}
                onChange={e => setProductData({ ...productData, volume: e.target.value as unknown as number })}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <CustomTextField
                fullWidth
                label='Length (cm)'
                placeholder='Ex: 100'
                type='number'
                value={productData.length}
                onChange={e => setProductData({ ...productData, length: e.target.value as unknown as number })}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <CustomTextField
                fullWidth
                label='Width (cm)'
                placeholder='Ex: 100'
                type='number'
                value={productData.width}
                onChange={e => setProductData({ ...productData, width: e.target.value as unknown as number })}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <CustomTextField
                fullWidth
                label='Height (cm)'
                placeholder='Ex: 100'
                type='number'
                value={productData.height}
                onChange={e => setProductData({ ...productData, height: e.target.value as unknown as number })}
              />
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <CustomTextField
                fullWidth
                label='Weight (kg)'
                placeholder='Ex: 1'
                type='number'
                value={productData.weight}
                onChange={e => setProductData({ ...productData, weight: e.target.value as unknown as number })}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography component='p' sx={{ mb: 2 }} fontSize={14} color='text.primary'>
                Product Image
              </Typography>
              <DropProductImage productData={productData} setProductData={setProductData} />
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

export default AddProductDialog
