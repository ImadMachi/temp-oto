import { Button, Menu, MenuItem } from '@mui/material'
import { type MouseEvent, useState } from 'react'

export default function BulkAction() {
  // States
  const [anchorManage, setAnchorManage] = useState<HTMLElement | null>(null)
  const [anchorPrint, setAnchorPrint] = useState<null | HTMLElement>(null)
  const [anchorTools, setAnchorTools] = useState<null | HTMLElement>(null)

  const handleClickManage = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorManage(event.currentTarget)
  }
  const handleClickPrint = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorPrint(event.currentTarget)
  }
  const handleClickTools = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorTools(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorManage(null)
    setAnchorPrint(null)
    setAnchorTools(null)
  }

  return (
    <>
      <div>
        <Button
          fullWidth
          variant='outlined'
          startIcon={<i className='tabler-settings-2' />}
          endIcon={<i className='tabler-chevron-down' />}
          aria-controls='basic-menu'
          aria-haspopup='true'
          onClick={handleClickManage}
        >
          Manage
        </Button>
        <Menu keepMounted id='basic-menu' anchorEl={anchorManage} onClose={handleClose} open={Boolean(anchorManage)}>
          <MenuItem onClick={handleClose}>
            <i className='tabler-eye text-[1rem]' /> View Order
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <i className='tabler-check text-[1rem]' /> Mark As Delivered
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <i className='tabler-stack-pop text-[1rem]' /> Mark As Picked Up
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <i className='tabler-x text-[1rem]' /> Cancel Order
          </MenuItem>
        </Menu>
      </div>
      <div>
        <Button
          fullWidth
          variant='outlined'
          startIcon={<i className='tabler-tools' />}
          endIcon={<i className='tabler-chevron-down' />}
          aria-controls='basic-menu'
          aria-haspopup='true'
          onClick={handleClickTools}
        >
          Tools
        </Button>
        <Menu keepMounted id='basic-menu' anchorEl={anchorTools} onClose={handleClose} open={Boolean(anchorTools)}>
          <MenuItem onClick={handleClose}>
            <i className='tabler-bubble-text text-[1rem]' /> Add Comment
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <i className='tabler-history text-[1rem]' /> Show Status History
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <i className='tabler-package text-[1rem]' /> Order Items
          </MenuItem>
        </Menu>
      </div>
      {/* <FormControl sx={{ minWidth: 160 }}>
            <InputLabel id='demo-basic-select-outlined-label' className='-top-2'>
              Age
            </InputLabel>
            <Select
              label='Age'
              defaultValue=''
              id='demo-basic-select-outlined'
              labelId='demo-basic-select-outlined-label'
              sx={{ ['& .MuiSelect-select']: { py: '.5rem!important' } }}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl> */}
    </>
  )
}
