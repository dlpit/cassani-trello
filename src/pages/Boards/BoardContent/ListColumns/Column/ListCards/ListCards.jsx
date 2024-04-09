import AttachmentIcon from '@mui/icons-material/Attachment'
import CommentIcon from '@mui/icons-material/Comment'
import GroupIcon from '@mui/icons-material/Group'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

const COLUMN_HEADER_HEIGHT = '52px'
const COLUMN_FOOTER_HEIGHT = '56px'

const cardBackgroundColor = (theme) => (theme.palette.mode === 'light' ? 'white' : '#F1E7D8')
const cardTextColor = (theme) => (theme.palette.mode === 'light' ? '#111111' : '#212121')


function ListCards() {
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
        ${COLUMN_HEADER_HEIGHT} -
        ${COLUMN_FOOTER_HEIGHT}
      )`,
      '&::-webkit-scrollbar-thumb': {
        background: '#DDC7B6'
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: '#D1B496'
      }
    }}
    >
      <Card sx={{
        bgcolor: (theme) => (theme.palette.card),
        color: (theme) => (theme.palette.text.card),
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'

      }}>
        <CardMedia
          sx={{ height: 140 }}
          image="https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/339973159_245830434507069_1192594632464006902_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeE_BwHowNhjrwJ1OSVa2I0pfszKMo7AJ2d-zMoyjsAnZ0A5DYVRXP_P17REG4WXXyuPgY-SnqCAkS8bvtnrPq-A&_nc_ohc=Q6lpuYzNIQYAb4VMyO8&_nc_ht=scontent.fsgn5-12.fna&oh=00_AfBl0lCu3uvS_3pcai-nyVpfD2MYa9tgrhvHHkwONwkFhw&oe=66181085"
          title="green iguana"
        />
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography>
            Lizard
          </Typography>
        </CardContent>
        <CardActions sx={{ p: '0 4px 8px 4px' }}>
          <Button sx={{ color: (theme) => theme.palette.button.primary }} size="small" startIcon={<GroupIcon />}>12</Button>
          <Button sx={{ color: (theme) => theme.palette.button.primary }} size="small" startIcon={<CommentIcon />}>14</Button>
          <Button sx={{ color: (theme) => theme.palette.button.primary }} size="small" startIcon={<AttachmentIcon />}>16</Button>
        </CardActions>
      </Card>

      <Card sx={{
        bgcolor: (theme) => (theme.palette.card),
        color: (theme) => (theme.palette.text.card),
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'

      }}>
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography>
            Lizard
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{
        bgcolor: (theme) => (theme.palette.card),
        color: (theme) => (theme.palette.text.card),
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'

      }}>
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography>
            Lizard
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{
        bgcolor: (theme) => (theme.palette.card),
        color: (theme) => (theme.palette.text.card),
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'

      }}>
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography>
            Lizard
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{
        bgcolor: (theme) => (theme.palette.card),
        color: (theme) => (theme.palette.text.card),
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'

      }}>
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography>
            Lizard
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{
        bgcolor: (theme) => (theme.palette.card),
        color: (theme) => (theme.palette.text.card),
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'

      }}>
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography>
            Lizard
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{
        bgcolor: (theme) => (theme.palette.card),
        color: (theme) => (theme.palette.text.card),
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'

      }}>
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography>
            Lizard
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{
        bgcolor: (theme) => (theme.palette.card),
        color: (theme) => (theme.palette.text.card),
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'

      }}>
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography>
            Lizard
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{
        bgcolor: (theme) => (theme.palette.card),
        color: (theme) => (theme.palette.text.card),
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'

      }}>
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography>
            Lizard
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{
        bgcolor: (theme) => (theme.palette.card),
        color: (theme) => (theme.palette.text.card),
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'

      }}>
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography>
            Lizard
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{
        bgcolor: (theme) => (theme.palette.card),
        color: (theme) => (theme.palette.text.card),
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'

      }}>
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography>
            Lizard
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{
        bgcolor: (theme) => (theme.palette.card),
        color: (theme) => (theme.palette.text.card),
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'

      }}>
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography>
            Lizard
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ListCards