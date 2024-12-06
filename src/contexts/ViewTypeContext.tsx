'use client'
import { ViewTypeEnum } from '@/constants/layout-constants'
import { createContext, type ReactNode, useState } from 'react'

interface ViewTypeContextProps {
  viewType: ViewTypeEnum
  setViewType: (viewType: ViewTypeEnum) => void
}

const initialViewTypeContext: ViewTypeContextProps = {
  viewType: ViewTypeEnum.LIST_VIEW,
  setViewType: () => {}
}

const ViewTypeContext = createContext<ViewTypeContextProps>(initialViewTypeContext)

export const ViewTypeProvider = ({ children }: { children: ReactNode }) => {
  const [viewType, setViewType] = useState<ViewTypeEnum>(ViewTypeEnum.LIST_VIEW)

  return <ViewTypeContext.Provider value={{ viewType, setViewType }}>{children}</ViewTypeContext.Provider>
}

export default ViewTypeContext
