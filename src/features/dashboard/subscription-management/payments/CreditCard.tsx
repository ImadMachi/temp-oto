import { Box, Button, Card, CardContent, Chip, IconButton, Typography } from '@mui/material'
import Image from 'next/image'

export interface CreditCardType {
  imageUrl: string
  name: string
  expiry: string
  primary: boolean
  expired: boolean
}

interface CreditCardProps {
  card: CreditCardType
}
export default function CreditCard({ card }: CreditCardProps) {
  return (
    <Card className='mb-3'>
      <CardContent className='flex items-center'>
        <Box
          component='div'
          sx={{ border: '1px solid', borderColor: 'divider' }}
          className='flex items-center p-2 rounded'
        >
          <Image src={card.imageUrl} alt='visa logo' width={60} height={27} />
        </Box>
        <div className='grow ml-6'>
          <Typography variant='body1' color='text.primary' className='font-semibold'>
            {card.name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Expires {card.expiry}
          </Typography>
        </div>
        <div>
          {card.expired ? (
            <Chip label='Expired' color='warning' size='small' variant='tonal' />
          ) : card.primary ? (
            <Chip label='Default' color='success' size='small' variant='tonal' />
          ) : (
            <Button variant='text' color='info' size='small'>
              Set as default
            </Button>
          )}
          <IconButton color='error' className='ml-2'>
            <i className='tabler-trash'></i>
          </IconButton>
        </div>
      </CardContent>
    </Card>
  )
}
