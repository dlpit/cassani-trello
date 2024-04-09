import AttachmentIcon from '@mui/icons-material/Attachment'
import CommentIcon from '@mui/icons-material/Comment'
import GroupIcon from '@mui/icons-material/Group'
import Button from '@mui/material/Button'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

function Card({ temporaryHideMedia }) {
  if (temporaryHideMedia) {
    return (
      <MuiCard sx={{
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
      </MuiCard>
    )
  }
  return (
    <MuiCard sx={{
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
    </MuiCard>
  )
}

export default Card