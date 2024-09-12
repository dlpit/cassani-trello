import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CustomLoading from '~/components/Loading/CustomLoading' // Import CustomLoading

function PageLoadingSpinner({ caption }) {
  return (
    <Box
      sx = {{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        gap: 2,
        backgroundColor: '#e8e8e8'
      }}>
      <CustomLoading />
      <Typography variant='h6' sx ={{ userSelect: 'none' }}>{caption}</Typography>
    </Box>
  )
}

export default PageLoadingSpinner
