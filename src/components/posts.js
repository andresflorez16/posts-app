import { Grid } from '@mui/material'
import { CardPost } from './card'

export const Posts = ({ posts, deletePost, editPost }) => {
  return (
    <Grid container spacing={2} width='100%'>
        {
          posts.map(post => (
            <Grid key={post.id} item width='100%' xs={12} sm={6}>
              <CardPost post={post} deletePost={deletePost} editPost={editPost}/>
            </Grid>
          ))
        }
    </Grid>
  )
}
