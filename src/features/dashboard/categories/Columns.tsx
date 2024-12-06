import type { CategoryType } from '@/types/productTypes'
import { Checkbox, Typography } from '@mui/material'
import { useMemo } from 'react'
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import { type ActionMenuProps } from './ActionMenu'
import Image from 'next/image'

export type ECommerceCategoryTypeWithAction = CategoryType & {
  action?: string
}
const columnHelper = createColumnHelper<ECommerceCategoryTypeWithAction>()

type ColumnProps = {
  data: CategoryType[]
  setData: (data: CategoryType[]) => void
  locale: string | string[]
  actionMenu: (props: ActionMenuProps) => JSX.Element
}
const useColumns = ({ data, setData, locale, actionMenu: ActionMenu }: ColumnProps) =>
  useMemo<ColumnDef<ECommerceCategoryTypeWithAction, any>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              id: row.original.id.toString(),
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('name', {
        header: 'Category',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <Image
              src={row.original.imageUrl}
              width={38}
              height={28}
              alt={row.original.name}
              className='rounded bg-actionHover'
            />
            <div className='flex flex-col'>
              <Typography className='font-medium' color='text.primary'>
                {row.original.name}
              </Typography>
              <Typography variant='body2'>{row.original.description}</Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => <ActionMenu category={row.original} />,
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  )

export default useColumns
