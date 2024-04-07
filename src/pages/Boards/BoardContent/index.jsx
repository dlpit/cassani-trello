import Box from '@mui/material/Box'

function BoardContent() {
  return (
    <Box sx={{
      bgcolor: (theme) => (theme.palette.mode === 'light' ? '#A5917B' : '#4C4A45'),
      width: '100%',
      height: (theme) => `calc(100vh - ${theme.casani.appBarHeight} - ${theme.casani.boarBarHeight})`,
      display: 'flex',
      alignItems: 'center'
    }}>
    Board Content
    </Box>
  )
}

export default BoardContent
