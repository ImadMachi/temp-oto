'use client'

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { ReactNode } from 'react'
import { toast } from 'react-toastify'

interface QueryMeta {
  errorMessage?: string
  successMessage?: string
}

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      const meta = query.meta as QueryMeta | undefined
      if (meta?.errorMessage) {
        toast.error(meta.errorMessage)
      }
    },
    onSuccess: (data: unknown, query) => {
      const meta = query.meta as QueryMeta | undefined
      if (meta?.successMessage) {
        toast.success(meta.successMessage)
      }
    }
  })
})

export default function ReactQueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
