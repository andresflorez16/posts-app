import { Box, CircularProgress } from '@mui/material'

export const Loader = () => {
  return (
    <Box
      sx={{ 
        display: 'flex',
        width: '95vw',
        minHeight: 'calc(80vh - 100px)',
        margin: '0 auto', 
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <CircularProgress 
        variant='indeterminate'
        size={80}
        thickness={6}
        disableShrink
        color='success' 
      />
    </Box>
  )
}
