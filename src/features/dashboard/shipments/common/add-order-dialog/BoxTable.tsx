import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import type { BoxDataType, OrderDataType } from '.'
import CustomTextField from '@/@core/components/mui/TextField'
import CustomAutocomplete from '@/@core/components/mui/Autocomplete'

const dummyBoxes: Partial<BoxDataType>[] = [
  {
    id: 1,
    name: 'Box 1',
    length: 15,
    width: 20,
    height: 30,
    weight: 50
  },
  {
    id: 2,
    name: 'Box 2',
    length: 15,
    width: 20,
    height: 30,
    weight: 50
  },
  {
    id: 3,
    name: 'Box 3',
    length: 15,
    width: 20,
    height: 30,
    weight: 50
  }
]

interface BoxTableProps {
  orderData: OrderDataType
  setOrderData: React.Dispatch<React.SetStateAction<OrderDataType>>
}
export default function BoxTable({ orderData, setOrderData }: BoxTableProps) {
  const handleAddProduct = () => {
    const newBoxType = {
      index: Math.floor(Math.random() * 1000),
      name: '',
      id: -1,
      length: 0,
      width: 0,
      height: 0,
      weight: 0
    }
    setOrderData({ ...orderData, boxes: [...orderData.boxes, newBoxType] })
  }
  const handleAutoCompleteChange = (e: any, value: Partial<BoxDataType> | null, boxIndex: number) => {
    if (value) {
      setOrderData({
        ...orderData,
        boxes: orderData.boxes.map(box => {
          if (box.index == boxIndex) {
            return { ...value, index: boxIndex } as BoxDataType
          } else {
            return box
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
              <TableCell>Box Type</TableCell>
              <TableCell align='center'>Length (cm)</TableCell>
              <TableCell align='center'>Width (cm)</TableCell>
              <TableCell align='center'>Height (cm)</TableCell>
              <TableCell align='center'>Weight (kg)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderData.boxes.map(box => (
              <TableRow key={box.index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  {box.id == -1 ? (
                    <CustomAutocomplete
                      fullWidth
                      options={dummyBoxes}
                      id='boxes-autocomplete-custom'
                      getOptionLabel={option => option.name || ''}
                      renderInput={params => <CustomTextField placeholder='Choose Box Type' {...params} />}
                      onChange={(e, value) => handleAutoCompleteChange(e, value, box.index)}
                    />
                  ) : (
                    box.name
                  )}
                </TableCell>

                <TableCell align='center'>
                  <div className='flex items-center'>
                    <IconButton
                      className='mr-1'
                      disabled={box.length === 1}
                      onClick={() =>
                        setOrderData({
                          ...orderData,
                          boxes: orderData.boxes.map(b =>
                            b.index === box.index && b.length > 1 ? { ...b, length: b.length - 1 } : b
                          )
                        })
                      }
                    >
                      <i className='tabler-minus text-[1rem]' />
                    </IconButton>
                    <span className='w-4 h-4 text-center text-xs'>{box.length}</span>
                    <IconButton
                      className='ml-1'
                      onClick={() =>
                        setOrderData({
                          ...orderData,
                          boxes: orderData.boxes.map(b => (b.index === box.index ? { ...b, length: b.length + 1 } : b))
                        })
                      }
                    >
                      <i className='tabler-plus text-[1rem] ' />
                    </IconButton>
                  </div>
                </TableCell>

                <TableCell align='center'>
                  <div className='flex items-center'>
                    <IconButton
                      className='mr-1'
                      disabled={box.width === 1}
                      onClick={() =>
                        setOrderData({
                          ...orderData,
                          boxes: orderData.boxes.map(b =>
                            b.index === box.index && b.width > 1 ? { ...b, width: b.width - 1 } : b
                          )
                        })
                      }
                    >
                      <i className='tabler-minus text-[1rem]' />
                    </IconButton>
                    <span className='w-4 h-4 text-center text-xs'>{box.width}</span>
                    <IconButton
                      className='ml-1'
                      onClick={() =>
                        setOrderData({
                          ...orderData,
                          boxes: orderData.boxes.map(b => (b.index === box.index ? { ...b, width: b.width + 1 } : b))
                        })
                      }
                    >
                      <i className='tabler-plus text-[1rem] ' />
                    </IconButton>
                  </div>
                </TableCell>

                <TableCell align='center'>
                  <div className='flex items-center'>
                    <IconButton
                      className='mr-1'
                      disabled={box.height === 1}
                      onClick={() =>
                        setOrderData({
                          ...orderData,
                          boxes: orderData.boxes.map(b =>
                            b.index === box.index && b.height > 1 ? { ...b, height: b.height - 1 } : b
                          )
                        })
                      }
                    >
                      <i className='tabler-minus text-[1rem]' />
                    </IconButton>
                    <span className='w-4 h-4 text-center text-xs'>{box.height}</span>
                    <IconButton
                      className='ml-1'
                      onClick={() =>
                        setOrderData({
                          ...orderData,
                          boxes: orderData.boxes.map(b => (b.index === box.index ? { ...b, height: b.height + 1 } : b))
                        })
                      }
                    >
                      <i className='tabler-plus text-[1rem] ' />
                    </IconButton>
                  </div>
                </TableCell>

                <TableCell align='center'>
                  <div className='flex items-center'>
                    <IconButton
                      className='mr-1'
                      disabled={box.weight === 1}
                      onClick={() =>
                        setOrderData({
                          ...orderData,
                          boxes: orderData.boxes.map(b =>
                            b.index === box.index && b.weight > 1 ? { ...b, weight: b.weight - 1 } : b
                          )
                        })
                      }
                    >
                      <i className='tabler-minus text-[1rem]' />
                    </IconButton>
                    <span className='w-4 h-4 text-center text-xs'>{box.weight}</span>
                    <IconButton
                      className='ml-1'
                      onClick={() =>
                        setOrderData({
                          ...orderData,
                          boxes: orderData.boxes.map(b => (b.index === box.index ? { ...b, weight: b.weight + 1 } : b))
                        })
                      }
                    >
                      <i className='tabler-plus text-[1rem] ' />
                    </IconButton>
                  </div>
                </TableCell>

                <TableCell align='right' className='flex items-center'>
                  <IconButton
                    color='error'
                    onClick={() =>
                      setOrderData({
                        ...orderData,
                        boxes: orderData.boxes.filter(p => p.index !== box.index)
                      })
                    }
                  >
                    <i className='tabler-trash text-[1rem]' />
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
