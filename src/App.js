import { useEffect, useState } from 'react'
import { Typography, Box, Button } from '@mui/material'
import AddCircleOutline from '@mui/icons-material/AddCircleOutlineOutlined';
import Api from './api'
import { Posts } from './components/posts'
import { Loader } from './components/loader'
import NewPost from './NewPost'
import { Routes, Route, Link } from 'react-router-dom'

const addNewPost = async (post) => {
  await Api.post('/posts', post, { headers: {'Content-type': 'application/json; charset=UTF-8'} })
}

const getPosts = async () => {
  const { data } = await Api.get('/posts')
  return data
}

const Home = ({ posts, handleDeletePost, handleEditPost }) => {
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
        posts.length > 0 && <Posts posts={posts} deletePost={handleDeletePost} editPost={handleEditPost}/>
      }
    </Box>
  );
}

const App = () => {
  const [posts, setPosts] = useState([])

  const handleDeletePost = async (postId) => {
    await Api.delete(`/posts/${postId}`)
    setPosts(posts.filter(post => post.id !== postId))
  }

  const handleNewPost = async (post) => {
    await addNewPost({ ...post, id: posts.length + 1, userId: 1 })
    const newPosts = [{ ...post, id: posts.length + 1, userId: 1 }, ...posts]
    setPosts(newPosts)
  }

  const handleEditPost = (post) => {
    console.log(post)
  }

  useEffect(() => {
    getPosts()
      .then(data => setPosts(data.sort((a, b) => a.id < b.id ? 1 : -1)))
      .catch(err => console.log('Error getting posts', err))
  }, [])

  return (
    <Box>
      <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
        <Typography variant='h2' display='inline-block' marginBottom={3}>
        PostsApp
        </Typography>
      </Link>
      <Routes>
        <Route path='/' exact element={<Home posts={posts} handleDeletePost={handleDeletePost} />} handleEditPost={handleEditPost}/>
        <Route path='new-post' exact element={<NewPost posts={posts} newPost={handleNewPost}/>}/>
      </Routes>
    </Box>
  )
}

export default App;
