import Box from '@mui/material/Box'
import Card from './Card/Card'

function ListCards({ cards }) {
  return (
    <Box sx={{
      p: '0 5px',
      m: '0 5px',
      display: 'flex',
      flexDirection: 'column',
      gap : 1,
      overflowX: 'hidden',
      overflowY: 'auto',
      maxHeight: (theme) => `calc(
        ${theme.casani.boardContentHeight} -
        ${theme.spacing(5)} -
        ${theme.casani.columnHeaderHeight} -
        ${theme.casani.columFooterHeight}
      )`,
      '&::-webkit-scrollbar-thumb': {
        background: '#DDC7B6'
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: '#D1B496'
      }
    }}
    >
      {cards?.map(card => <Card key={card._id} card={card}/> )}

    </Box>
  )
}

export default ListCards