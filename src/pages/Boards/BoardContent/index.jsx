import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'

function BoardContent() {
  return (
    <Box sx={{
      bgcolor: (theme) => (theme.palette.mode === 'light' ? '#BABCA7' : '#4C4A45'),
      width: '100%',
      height: (theme) => theme.casani.boardContentHeight,
      p: '10px 0'
    }}>
      <ListColumns />
    </Box>
  )
}

export default BoardContent
