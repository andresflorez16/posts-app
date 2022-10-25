import { TableRow, TableCell, Skeleton } from '@mui/material'

const LoaderRows = () => (
  <>
    <TableRow>
      <TableCell
        colSpan={3}
      >
        <Skeleton
          animation='wave'
        />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell
        colSpan={3}
      >
        <Skeleton
          animation='wave'
        />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell
        colSpan={3}
      >
        <Skeleton
          animation='wave'
        />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell
        colSpan={3}
      >
        <Skeleton
          animation='wave'
        />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell
        colSpan={3}
      >
        <Skeleton
          animation='wave'
        />
      </TableCell>
    </TableRow>
  </>
)

export default LoaderRows
