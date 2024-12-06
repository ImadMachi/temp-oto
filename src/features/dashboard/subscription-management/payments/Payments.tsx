'use client'

import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material'
import CreditCard from './CreditCard'
import AddCreditCardDialog from './AddCreditCardDialog'
import { useState } from 'react'

const creditCards = [
  {
    imageUrl: '/images/logos/visa.png',
    name: '**** **** **** 2154',
    expiry: '12/24',
    primary: true,
    expired: false
  },
  {
    imageUrl: '/images/logos/master-card.png',
    name: '**** **** **** 2154',
    expiry: '06/25',
    primary: false,
    expired: false
  },
  {
    imageUrl: '/images/logos/paypal.png',
    name: 'i*******@gmail.com',
    expiry: '10/28',
    primary: false,
    expired: true
  }
]

export default function Payments() {
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  return (
    <Box component='div'>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Typography variant='h3' className='text-2xl font-semibold flex items-center mb-3' color='text.primary'>
            <i className='tabler-credit-card text-2xl mr-2'></i>
            Credit Cards
          </Typography>
          <Typography variant='body1'>Manage your credit cards and payment methods</Typography>
          <Button
            variant='contained'
            color='primary'
            className='mt-4'
            startIcon={<i className='tabler-plus' />}
            onClick={() => setAddDialogOpen(true)}
          >
            Add New Card
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              {creditCards.map((item, index) => (
                <CreditCard key={index} card={item} />
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {addDialogOpen && <AddCreditCardDialog open={addDialogOpen} setOpen={setAddDialogOpen} />}
    </Box>
  )
}
