'use client'

// React Imports
import { type MouseEvent, useEffect, useRef, useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { Button, DialogActions, DialogContent, FormControlLabel, Grid, Menu, MenuItem, Switch } from '@mui/material'
import CustomTextField from '@/@core/components/mui/TextField'
import { toCanvas } from 'bwip-js/browser'
import { PDFDocument } from 'pdf-lib'

const barcodeTypes = ['upca', 'code39', 'code128', 'ean13']

type GenerateBarcodeDialogProps = {
  open: boolean
  setOpen: (open: boolean) => void
}
const GenerateBarcodeDialog = ({ open, setOpen }: GenerateBarcodeDialogProps) => {
  // States
  const [barcode, setBarcode] = useState('')
  const [barcodeType, setBarcodeType] = useState<string>(barcodeTypes[0])
  const [isHumanTextVisible, setIsHumanTextVisible] = useState(true)
  const [error, setError] = useState('')
  const [anchorDownload, setAnchorDownload] = useState<HTMLElement | null>(null)

  // Hooks
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current && barcode) {
      setError('')
      try {
        toCanvas(canvasRef.current, {
          bcid: barcodeType,
          text: barcode,
          includetext: isHumanTextVisible,
          barcolor: '#000',
          backgroundcolor: '#fff',
          textcolor: '#000',
          paddingbottom: 5,
          paddingtop: 5,
          paddingleft: 5,
          paddingright: 5
        })
      } catch (error) {
        setError(String(error).split(':')[2])
      }
    }
  }, [barcode, barcodeType, isHumanTextVisible])

  // Methods
  const handleClose = () => setOpen(false)

  const handleCloseDownload = () => {
    setAnchorDownload(null)
  }
  const handleClickDownload = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorDownload(event.currentTarget)
  }

  const handleDownloadPNG = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const image = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = image
      link.download = 'barcode.png'
      link.click()
    }
  }

  // Function to handle the download as PDF
  const handleDownloadPDF = async () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const image = canvas.toDataURL('image/png') // Convert canvas to data URL

      // Get canvas dimensions
      const canvasWidth = canvas.width
      const canvasHeight = canvas.height

      // Create a new PDF document
      const pdfDoc = await PDFDocument.create()

      // Add a page with dimensions matching the image size
      const page = pdfDoc.addPage([canvasWidth, canvasHeight])

      // Embed the image into the PDF
      const pngImage = await pdfDoc.embedPng(image)
      const { width, height } = pngImage.scale(1) // Scale the image to its actual size

      // Draw the image on the page
      page.drawImage(pngImage, {
        x: 0,
        y: 0,
        width,
        height
      })

      // Save the PDF and trigger download
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'barcode.pdf'
      link.click()
    }
  }

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      maxWidth='md'
      scroll='body'
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogTitle variant='h4' className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        Generate Barcode
      </DialogTitle>
      <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField
                fullWidth
                label='Barcode'
                placeholder='Ex: 123456789012'
                value={barcode}
                onChange={e => setBarcode(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomTextField
                fullWidth
                select
                className='min-w-20 ml-1'
                label='Barcode Type'
                value={barcodeType}
                onChange={e => setBarcodeType(e.target.value)}
              >
                {barcodeTypes.map((barcodeType, index) => (
                  <MenuItem key={index} value={barcodeType}>
                    {barcodeType}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4} className='self-end'>
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked={isHumanTextVisible}
                    onChange={() => setIsHumanTextVisible(!isHumanTextVisible)}
                  />
                }
                label='Include Human Readable Text?'
              />
            </Grid>
            <Grid item xs={12} className='justify-center'>
              <div className='text-center mt-2'>
                {error && <p className='text-red-500'>{error}</p>}
                {barcode && <canvas ref={canvasRef} className={`max-h-28 ${error ? 'opacity-0 h-0' : ''}`}></canvas>}
              </div>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
        <div>
          <Button
            fullWidth
            variant='contained'
            startIcon={<i className='tabler-download' />}
            endIcon={<i className='tabler-chevron-down' />}
            aria-controls='basic-menu'
            aria-haspopup='true'
            onClick={handleClickDownload}
            disabled={!(barcode && !error)}
          >
            Download
          </Button>

          <Menu
            keepMounted
            id='basic-menu'
            anchorEl={anchorDownload}
            onClose={handleCloseDownload}
            open={Boolean(anchorDownload)}
          >
            <MenuItem onClick={handleDownloadPDF}>
              <i className='tabler-file-type-pdf' /> PDF
            </MenuItem>
            <MenuItem onClick={handleDownloadPNG}>
              <i className='tabler-file-type-png' /> PNG
            </MenuItem>
          </Menu>
        </div>
        <Button variant='tonal' color='secondary' type='reset' onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default GenerateBarcodeDialog
