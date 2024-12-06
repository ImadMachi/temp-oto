'use client'
// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import { useEffect, useState } from 'react'
import { getLogs } from '@/app/server/actions'
import type { LogType } from '@/types/logTypes'
import LogsListTable from '../common/LogsListTable'

const visibleColumns: (keyof LogType)[] = [
  'id',
  'orderId',
  'deliveryCompany',
  'url',
  'errorTime',
  'errorMessage',
  'method'
]

const ShipmentErrorLogsList = () => {
  const [logs, setLogs] = useState<LogType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const logs = await getLogs()
      setLogs(logs)
      setIsLoading(false)
    })()
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <LogsListTable data={logs} isLoading={isLoading} visibleColumns={visibleColumns} />
      </Grid>
    </Grid>
  )
}

export default ShipmentErrorLogsList
