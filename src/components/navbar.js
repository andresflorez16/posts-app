import { useContext } from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { Link } from 'react-router-dom'
import { ColorModeContext } from '../lib/theme'

export const Navbar = () => {
  const { toggleColorMode } = useContext(ColorModeContext)
  const theme = useTheme()
  return (
    <Box
      position='sticky'
      top={0}
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      px={3}
      sx={{
        backdropFilter: 'blur(10px)',
        zIndex: 10
      }}
    >
      <Link to='/' style={{ textDecoration: 'none' }}>
        <Typography variant='h2' display='inline-block' color='primary' marginBottom={3}>
        PostsApp
        </Typography>
      </Link>
      <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon color='warning' /> : <Brightness4Icon color='secondary' />}
      </IconButton>
    </Box>
  )
}
