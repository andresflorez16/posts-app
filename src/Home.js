import { Box, Button } from '@mui/material'
import AddCircleOutline from '@mui/icons-material/AddCircleOutlineOutlined';
import { Link } from 'react-router-dom'
import { Posts } from './components/posts'
import { Loader } from './components/loader'

const Home = ({ posts, handleDeletePost, editPost }) => {
  return (
    <Box>
      <Link to='/new-post' style={{ textDecoration: 'none' }}>
        <Button
          variant='contained'
          color='success'
          startIcon={<AddCircleOutline />}
          sx={{ marginBottom: 1, marginLeft: 4 }}
        >
          New Post
        </Button>
      </Link>
      {
        posts.length < 1 && <Loader />
      }
      {
        posts.length > 0 && <Posts posts={posts} deletePost={handleDeletePost} editPost={editPost}/>
      }
    </Box>
  );
}

export default Home
