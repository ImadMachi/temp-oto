import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { deliveryCompanies, type DeliveryCompanyType } from './DeliveryCompanyFilter'

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein }
}

interface DeliveryCompanyStatisticTableProps {
  deliveryCompany: DeliveryCompanyType | null
}
export default function DeliveryCompanyStatisticTable({ deliveryCompany }: DeliveryCompanyStatisticTableProps) {
  const getRow = (row: DeliveryCompanyType) => {
    return (
      <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component='th' scope='row'>
          {row.name}
        </TableCell>
        <TableCell>{row.avgDeliveryTime}</TableCell>
        <TableCell>{row.avgPickupTime}</TableCell>
        <TableCell>{row.avgTransitTime}</TableCell>
        <TableCell align='right'>{row.transitRate}</TableCell>
        <TableCell align='right'>{row.deliveryRate}</TableCell>
        <TableCell align='right'>{row.returnRate}</TableCell>
        <TableCell align='right'>{row.serviceLevel}</TableCell>
        <TableCell align='right'>{row.numberOfOrders}</TableCell>
        <TableCell align='right'>{row.allocation}</TableCell>
      </TableRow>
    )
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Company</TableCell>
            <TableCell>Avg Delivery Time</TableCell>
            <TableCell>Avg Pickup Time</TableCell>
            <TableCell>Avg Transit Time</TableCell>
            <TableCell align='right'>Transit Rate</TableCell>
            <TableCell align='right'>Delivery Rate</TableCell>
            <TableCell align='right'>Return Rate</TableCell>
            <TableCell align='right'>Service Level</TableCell>
            <TableCell align='right'>No of Orders</TableCell>
            <TableCell align='right'>Allocation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{deliveryCompany ? getRow(deliveryCompany) : deliveryCompanies.map(row => getRow(row))}</TableBody>
      </Table>
    </TableContainer>
  )
}
