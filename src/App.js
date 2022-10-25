import { useEffect, useState } from 'react'
import { Box, CssBaseline } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { addNewPost, updatePost, getPosts, deletePost } from './api'
import { ToggleColorMode } from './lib/theme'
import Home from './Home'
import { Navbar } from './components/navbar'
import NewPost from './NewPost'

const App = () => {
  const [posts, setPosts] = useState([])

  const handleDeletePost = async (postId) => {
    await deletePost(postId)
    setPosts(posts.filter(post => post.id !== postId))
  }

  const handleNewPost = async (post) => {
    await addNewPost({ ...post, id: posts.length + 1, userId: 1 })
    if(posts.length === 100) {
      const newPosts = posts.map(el => {
        if(el.id === 100) {
          return ({ ...post, id: posts.length, userId: 1 })
        }
        return el
      })
      setPosts(newPosts)
    } else {
      const newPosts = [{ ...post, id: posts.length + 1, userId: 1 }, ...posts]
      setPosts(newPosts)
    }
  }

  const handleEditPost = async (post) => {
    await updatePost(post)
    const newPosts = posts.map(el => {
      if(el.id === post.id) return post
      return el
    })
    setPosts(newPosts)
  }

  useEffect(() => {
    getPosts()
      .then(data => setPosts(data.sort((a, b) => a.id < b.id ? 1 : -1)))
      .catch(err => console.log('Error getting posts', err))
  }, [])

  return (
    <SnackbarProvider maxSnack={3}>
      <ToggleColorMode>
        <CssBaseline />
        <Box>
          <Navbar />
          <Routes>
            <Route path='/' exact element={<Home posts={posts} handleDeletePost={handleDeletePost} editPost={handleEditPost}/>} />
            <Route path='new-post' exact element={<NewPost posts={posts} newPost={handleNewPost}/>}/>
          </Routes>
        </Box>
      </ToggleColorMode>
    </SnackbarProvider>
  )
}

export default App;
