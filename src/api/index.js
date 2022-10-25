import axios from 'axios'

const Api = axios.create({ baseURL: 'https://jsonplaceholder.typicode.com/' })

export const addNewPost = async (post) => {
  await Api.post('/posts', post, { headers: {'Content-type': 'application/json; charset=UTF-8'} })
}

export const updatePost = async (post) => {
  await Api.put(`/posts/${post.id}`, post, { headers: {'Content-type': 'application/json; charset=UTF-8'} })
}

export const getPosts = async () => {
  const { data } = await Api.get('/posts')
  return data
}

export const deletePost = async (postId) => {
  await Api.delete(`/posts/${postId}`)
}

export const getUser = async (idUser) => {
  const { data } = await Api.get(`/users/${idUser}`)
  return data
}

export const getComments = async (postId) => {
  const { data } = await Api('/comments')
  return data.filter(el => el.postId === postId)
}

export default Api
