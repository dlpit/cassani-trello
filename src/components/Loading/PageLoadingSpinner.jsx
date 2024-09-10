import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import CustomLoading from '~/assets/CustomLoading' // Import CustomLoading

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
      <svg className="pl" width="6em" height="6em" viewBox="0 0 240 240">
        <circle className="pl__ring pl__ring--a" cx="120" cy="120" r="105" fill="none" stroke="#f42f25" strokeWidth="20" strokeDasharray="0 660" strokeDashoffset="-330" strokeLinecap="round"></circle>
        <circle className="pl__ring pl__ring--b" cx="120" cy="120" r="35" fill="none" stroke="#f49725" strokeWidth="20" strokeDasharray="0 220" strokeDashoffset="-110" strokeLinecap="round"></circle>
        <circle className="pl__ring pl__ring--c" cx="85" cy="120" r="70" fill="none" stroke="#255ff4" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
        <circle className="pl__ring pl__ring--d" cx="155" cy="120" r="70" fill="none" stroke="#f42582" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
      </svg>
      <Typography variant='h6' sx ={{ userSelect: 'none' }}>{caption}</Typography>
    </Box>
  )
}

export default PageLoadingSpinner
