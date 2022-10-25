import { Box, Container, Typography, TextField, Button } from '@mui/material'
import ErrorOutlined from '@mui/icons-material/ErrorOutlined';
import PostAddOutlined from '@mui/icons-material/PostAddOutlined';
import { useForm } from 'react-hook-form'
import './index.css'
import { useMin600, useMin500 } from './utils/media-queries'

const EditPost = ({ editPost, post }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => editPost(data)

  return (
    <Box
      sx={{ width: useMin600() ? '70%' : '100%', marginX: 'auto' }}
    >
      <Typography variant='h4' my={1}>Edit Post</Typography>
      <form
        className='form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Container
          sx={{ 
            width: useMin500() ? '60%' : '100%',
            height: '50%',
            display: 'flex',
            justifyContent: 'center',
            aligntItems: 'center',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <TextField
            label='Title'
            placeholder='Title'
            {...register('title', { required: true })}
          />
          {errors.title && <Typography color='error' sx={{ display: 'flex', alignItems: 'center' }}>{<ErrorOutlined color='error' />} The title is Required</Typography>}
          <TextField
            multiline
            rows={4}
            label='Description'
            placeholder='Description'
            {...register('body', { required: true })}
          />
          {errors.body && 
            <Typography
              color='error'
              sx={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {<ErrorOutlined color='error' />}
              The description is Required
            </Typography>}
        </Container>
        <Button 
          color='success'
          type='submit'
          variant='contained'
          size='large'
          startIcon={<PostAddOutlined />}
        >
          Edit
        </Button>
      </form>
    </Box>
  )
}

export default EditPost
