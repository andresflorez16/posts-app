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
import Api from '../api'
import { Comments } from './comments'

const getUser = async (idUser) => {
  const { data } = await Api.get(`/users/${idUser}`)
  return data
}

export const CardPost = ({ post, deletePost, editPost }) => {
  const [user, setUser] = useState()

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
                onClick={() => deletePost(post.id)}
              >
                Delete
              </Button>
              <Button
                color='primary'
                startIcon={<EditOutlined />}
              >
                Edit
              </Button>
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
