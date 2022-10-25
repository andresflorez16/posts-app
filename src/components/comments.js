import { useState, useEffect } from 'react'
import { 
  Table, 
  TableHead, 
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  TablePagination,
  Typography
} from '@mui/material'
import Api from '../api'
import LoaderRows from './loader-rows'

const getComments = async (postId) => {
  const { data } = await Api('/comments')
  return data.filter(el => el.postId === postId)
}

export const Comments = ({ postId }) => {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  useEffect(() => {
    getComments(postId)
      .then(res => { 
        setLoading(false)
        setComments(res) 
      })
      .catch(err => console.log('Error getting comments', err))
  }, [])

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ height: 400 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              loading && <LoaderRows />
            }
            {
              comments < 1 &&
                <TableRow>
                  <TableCell align='center' colSpan={3}>Not comments yet</TableCell>
                </TableRow>
            }
            { comments.length > 0 && comments
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.body}</TableCell>
                  <TableCell align='right'>{row.email}</TableCell>
                </TableRow>
              )
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 5, 10]}
        component="div"
        count={comments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
