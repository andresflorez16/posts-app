import { useState, useEffect } from 'react'
import { 
  Card,
  CardContent,
  CardHeader,
  Typography,
  Divider,
  Box,
  Button
} from '@mui/material'
import DeleteOutlined from '@mui/icons-material/Delete'
import EditOutlined from '@mui/icons-material/EditOutlined'
import { useSnackbar } from 'notistack'
import { getUser } from '../api'
import { Comments } from './comments'
import { EditModal } from './edit-modal'

export const CardPost = ({ post, deletePost, editPost }) => {
  const [user, setUser] = useState()
  const [openModal, setOpenModal] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  const handleDeletePost = () => {
    deletePost(post.id)
    enqueueSnackbar('Post deleted', {
      variant: 'error',
      autoHideDuration: 1500,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    })
  }

  useEffect(() => {
    getUser(post.userId)
      .then(res => setUser(res))
      .catch(err => console.log('Error getting user', err))
  }, [])

  return (
    <Card 
      variant='solid'
      sx={{ 
      margin: '0 auto',
      width: '90%', 
      minHeight: '100%',
      backgroundColor: '#333', 
      color: 'white'
      }}
    >
      {
        user && 
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography p={1}>{user.name}</Typography>
            <Box>
              <Button 
                color='error'
                startIcon={<DeleteOutlined />}
                onClick={() => handleDeletePost()}
              >
                Delete
              </Button>
              <Button
                color='success'
                startIcon={<EditOutlined />}
                onClick={() => handleOpenModal()}
              >
                Edit
              </Button>
              <EditModal open={openModal} handleCloseModal={handleCloseModal} editPost={editPost} post={post}/>
            </Box>
          </Box>
      }
      <CardHeader title={<Typography textTransform='capitalize' textAlign='center'>{post.title}</Typography>}/>
      <CardContent>
        <Typography variant='body2'>{post.body}</Typography>
        <Divider sx={{ marginY: 1, backgroundColor: '#fff' }} />
        <Comments postId={post.id} />
      </CardContent>
    </Card>
  )
} 
