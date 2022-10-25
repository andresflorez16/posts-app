import { 
  Modal,
  Fade,
  Box,
  Typography,
  Container,
  Backdrop,
  TextField,
  Button
} from '@mui/material'
import ErrorOutlined from '@mui/icons-material/ErrorOutlined';
import PostAddOutlined from '@mui/icons-material/PostAddOutlined';
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useMin500 } from '../utils/media-queries'

const styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 1,
}

export const EditModal = ({ open, handleCloseModal, post, editPost }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { enqueueSnackbar } = useSnackbar()

  const onSubmit = (data) => {
    editPost({ ...post, ...data })
    enqueueSnackbar('Post updated', {
      variant: 'success',
      autoHideDuration: 1500,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      }
    })
  }

  return (
    <Modal
      aria-labelledby="modal-edit"
      aria-describedby='modal-edit-description'
      open={open}
      onClose={handleCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Box sx={{ ...styles, width: useMin500() ? 450 : 400 }}>
          <Typography variant='h4'>Edit Post</Typography>
          <form
            className='form'
            onSubmit={handleSubmit(onSubmit)}
          >
            <Container
              sx={{ 
                display: 'flex',
                justifyContent: 'center',
                aligntItems: 'center',
                flexDirection: 'column',
                gap: 2
              }}
            >
              <TextField
                label='Title'
                fullWidth
                defaultValue={post.title}
                placeholder='Title'
                {...register('title', { required: true })}
              />
              {errors.title && <Typography color='error' sx={{ display: 'flex', alignItems: 'center' }}>{<ErrorOutlined color='error' />} The title is Required</Typography>}
              <TextField
                multiline
                fullWidth
                rows={4}
                label='Description'
                defaultValue={post.body}
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
      </Fade>
    </Modal>
  )
}
