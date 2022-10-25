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
import { useForm } from 'react-hook-form'

const styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
}

export const EditModal = ({ open, handleCloseModal, post, editPost }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    editPost({ ...post, ...data })
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
        <Box sx={styles}>
          <Typography variant='h4' my={1}>Edit Post</Typography>
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
                defaultValue={post.title}
                placeholder='Title'
                {...register('title', { required: true })}
              />
              {errors.title && <Typography color='error' sx={{ display: 'flex', alignItems: 'center' }}>{<ErrorOutlined color='error' />} The title is Required</Typography>}
              <TextField
                multiline
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
