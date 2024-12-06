import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import type { OrderDataType, ProductDataType } from '.'
import CustomTextField from '@/@core/components/mui/TextField'
import CustomAutocomplete from '@/@core/components/mui/Autocomplete'

const dummyProducts: Partial<ProductDataType>[] = [
  {
    id: 1,
    name: 'Product 1',
    sku: 'SKU 1',
    quantity: 1,
    price: 100,
    tax: 10
  },
  {
    id: 2,
    name: 'Product 2',
    sku: 'SKU 2',
    quantity: 2,
    price: 200,
    tax: 20
  },

  {
    id: 3,
    name: 'Product 3',
    sku: 'SKU 3',
    quantity: 3,
    price: 300,
    tax: 30
  },

  {
    id: 4,
    name: 'Product 4',
    sku: 'SKU 4',
    quantity: 4,
    price: 400,
    tax: 40
  }
]

interface ProductTableProps {
  orderData: OrderDataType
  setOrderData: React.Dispatch<React.SetStateAction<OrderDataType>>
}
export default function ProductTable({ orderData, setOrderData }: ProductTableProps) {
  const handleAddProduct = () => {
    const newProduct = {
      index: Math.floor(Math.random() * 1000),
      id: -1,
      name: '',
      sku: '',
      quantity: 1,
      price: 0,
      tax: 0,
      isEdit: true
    }
    setOrderData({ ...orderData, products: [...orderData.products, newProduct] })
  }
  const handleAutoCompleteChange = (e: any, value: Partial<ProductDataType> | null, productIndex: number) => {
    if (value) {
      setOrderData({
        ...orderData,
        products: orderData.products.map(product => {
          if (product.index == productIndex) {
            return { ...value, index: productIndex } as ProductDataType
          } else {
            return product
          }
        })
      })
    }
  }

  return (
    <div className='relative group'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell align='right'>SKU</TableCell>
              <TableCell align='center'>Quantity</TableCell>
              <TableCell align='right'>Price</TableCell>
              <TableCell align='right'>Tax</TableCell>
              <TableCell align='right'>Total</TableCell>
              <TableCell align='right'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderData.products.map(product => (
              <TableRow key={product.index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  {product.isEdit && product.id == -1 ? (
                    <CustomAutocomplete
                      fullWidth
                      options={dummyProducts}
                      id='products-autocomplete-custom'
                      getOptionLabel={option => option.name || ''}
                      renderInput={params => <CustomTextField placeholder='Choose Warehouse' {...params} />}
                      onChange={(e, value) => handleAutoCompleteChange(e, value, product.index)}
                    />
                  ) : (
                    product.name
                  )}
                </TableCell>
                <TableCell align='right'>
                  {product.isEdit ? (
                    <CustomTextField
                      sx={{ '& *': { p: '0!important', maxWidth: '100px' } }}
                      value={product.sku}
                      onChange={e =>
                        setOrderData({
                          ...orderData,
                          products: orderData.products.map(p =>
                            p.id === product.id ? { ...p, sku: e.target.value } : p
                          )
                        })
                      }
                    />
                  ) : (
                    product.sku
                  )}
                </TableCell>
                <TableCell align='center'>
                  <div className='flex items-center'>
                    <IconButton
                      className='mr-1'
                      disabled={product.quantity === 1}
                      onClick={() =>
                        setOrderData({
                          ...orderData,
                          products: orderData.products.map(p =>
                            p.id === product.id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
                          )
                        })
                      }
                    >
                      <i className='tabler-minus text-[1rem]' />
                    </IconButton>
                    <span className='w-4 h-4 text-center text-xs'>{product.quantity}</span>
                    <IconButton
                      className='ml-1'
                      onClick={() =>
                        setOrderData({
                          ...orderData,
                          products: orderData.products.map(p =>
                            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                          )
                        })
                      }
                    >
                      <i className='tabler-plus text-[1rem] ' />
                    </IconButton>
                  </div>
                </TableCell>
                <TableCell align='right'>
                  {product.isEdit ? (
                    <CustomTextField
                      sx={{ '& *': { p: '0!important', maxWidth: '80px' } }}
                      type='number'
                      value={product.price}
                      onChange={e =>
                        setOrderData({
                          ...orderData,
                          products: orderData.products.map(p =>
                            p.id === product.id ? { ...p, price: e.target.value as unknown as number } : p
                          )
                        })
                      }
                    />
                  ) : (
                    `${product.price} ${orderData.currency}`
                  )}
                </TableCell>
                <TableCell align='right'>
                  {product.isEdit ? (
                    <CustomTextField
                      sx={{ '& *': { p: '0!important', maxWidth: '80px' } }}
                      type='number'
                      value={product.tax}
                      onChange={e =>
                        setOrderData({
                          ...orderData,
                          products: orderData.products.map(p =>
                            p.id === product.id ? { ...p, tax: e.target.value as unknown as number } : p
                          )
                        })
                      }
                    />
                  ) : (
                    `${product.tax}%`
                  )}
                </TableCell>
                <TableCell align='right'>{`${product.quantity * (product.price + (product.price * product.tax) / 100)} ${orderData.currency}`}</TableCell>
                <TableCell align='right' className='flex items-center'>
                  <IconButton
                    color='error'
                    onClick={() =>
                      setOrderData({
                        ...orderData,
                        products: orderData.products.filter(p => p.index !== product.index)
                      })
                    }
                  >
                    <i className='tabler-trash text-[1rem]' />
                  </IconButton>
                  <IconButton
                    color='info'
                    disabled={product.isEdit}
                    onClick={() =>
                      setOrderData({
                        ...orderData,
                        products: orderData.products.map(p => (p.index === product.index ? { ...p, isEdit: true } : p))
                      })
                    }
                  >
                    <i className='tabler-edit text-[1rem]' />
                  </IconButton>
                  <IconButton
                    color='success'
                    disabled={!product.isEdit || product.id < 0}
                    onClick={() =>
                      setOrderData({
                        ...orderData,
                        products: orderData.products.map(p => (p.index === product.index ? { ...p, isEdit: false } : p))
                      })
                    }
                  >
                    <i className='tabler-check text-[1rem]' />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <IconButton
        className='absolute hidden -right-7 bottom-1 p-1 w-8 h-8 group-hover:flow-root'
        onClick={handleAddProduct}
      >
        <i className='tabler-plus text-[1rem]' />
      </IconButton>
    </div>
  )
}
