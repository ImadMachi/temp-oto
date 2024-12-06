import { Skeleton } from '@mui/material'

export default function TableBodySkeleton({ length }: { length: number }) {
  return (
    <tbody>
      {[...Array(10)].map((_, index) => (
        <tr key={index}>
          {[...Array(length)].map((_, index) => (
            <td key={index}>
              <Skeleton height={15} />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}
