import { Accordion, AccordionDetails, AccordionSummary, Button, DialogActions, DialogContent } from '@mui/material'

interface InstructionsProps {
  handleClose: () => void
  setTabValue: (param: string) => void
}
export default function Instructions({ handleClose, setTabValue }: InstructionsProps) {
  return (
    <>
      <DialogContent className='overflow-visible pbs-0 sm:pli-16'>
        <Accordion>
          <AccordionSummary expandIcon={<i className='tabler-chevron-down' />}>Step 1</AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<i className='tabler-chevron-down' />}>Step 2</AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<i className='tabler-chevron-down' />}>Step 3</AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<i className='tabler-chevron-down' />}>Step 4</AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
            leo lobortis eget.
          </AccordionDetails>
        </Accordion>
      </DialogContent>
      <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
        <Button variant='contained' onClick={() => setTabValue('form')}>
          Continue
        </Button>
        <Button variant='tonal' color='secondary' type='reset' onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </>
  )
}
