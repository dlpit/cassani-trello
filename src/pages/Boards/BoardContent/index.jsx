import AddCardIcon from '@mui/icons-material/AddCard'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentPaste from '@mui/icons-material/ContentPaste'
import DeleteIcon from '@mui/icons-material/Delete'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

const COLUMN_HEADER_HEIGHT = '52px'
const COLUMN_FOOTER_HEIGHT = '56px'

const cardBackgroundColor = (theme) => (theme.palette.mode === 'light' ? 'white' : '#F1E7D8')
const cardTextColor = (theme) => (theme.palette.mode === 'light' ? '#111111' : '#212121')

function BoardContent() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box sx={{
      bgcolor: (theme) => (theme.palette.mode === 'light' ? '#BABCA7' : '#4C4A45'),
      width: '100%',
      height: (theme) => theme.casani.boardContentHeight,
      p: '10px 0'
    }}>
      <Box sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}>
        {/* Box 1 */}
        <Box sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: (theme) => (theme.palette.mode === 'light' ? '#F1E7D8' : '#A5917B'),
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.casani.boardContentHeight} - ${theme.spacing(5)})`
        }}>
          {/* Box Column Header */}
          <Box sx={{
            height: COLUMN_HEADER_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography variant="h6" sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              color: '#111111',
              cursor: 'pointer'
            }}
            >
              Column Title
            </Typography>
            <Box>
              <Tooltip title='More option'>
                <ExpandMoreIcon
                  sx={{
                    color: '#111111',
                    cursor: 'pointer'
                  }}
                  id="basic-column-dropdown"
                  aria-controls={open ? 'basic-menu-columm-dropdown' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                />
              </Tooltip>
              <Menu
                id="basic-menu-columm-dropdown"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-column-dropdown'
                }}
              >
                <MenuItem>
                  <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><BookmarkBorderIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          {/* Box List Card */}
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
              bgcolor: cardBackgroundColor,
              color: cardTextColor,
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
                <Button size="small" startIcon={<GroupIcon />}>12</Button>
                <Button size="small" startIcon={<CommentIcon />}>14</Button>
                <Button size="small" startIcon={<AttachmentIcon />}>16</Button>
              </CardActions>
            </Card>

            <Card sx={{
              bgcolor: cardBackgroundColor,
              color: cardTextColor,
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{
              bgcolor: cardBackgroundColor,
              color: cardTextColor,
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{
              bgcolor: cardBackgroundColor,
              color: cardTextColor,
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{
              bgcolor: cardBackgroundColor,
              color: cardTextColor,
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{
              bgcolor: cardBackgroundColor,
              color: cardTextColor,
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{
              bgcolor: cardBackgroundColor,
              color: cardTextColor,
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{
              bgcolor: cardBackgroundColor,
              color: cardTextColor,
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{
              bgcolor: cardBackgroundColor,
              color: cardTextColor,
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{
              bgcolor: cardBackgroundColor,
              color: cardTextColor,
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>
          </Box>
          {/* Box Column Footer */}
          <Box sx={{
            height: COLUMN_FOOTER_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Button startIcon={<AddCardIcon />}>Add new card</Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor: 'pointer' }}/>
            </Tooltip>
          </Box>
        </Box>

        {/* Box 2 */}
        <Box sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: (theme) => (theme.palette.mode === 'light' ? '#F1E7D8' : '#A5917B'),
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.casani.boardContentHeight} - ${theme.spacing(5)})`
        }}>
          {/* Box Column Header */}
          <Box sx={{
            height: COLUMN_HEADER_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography variant="h6" sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              color: '#111111',
              cursor: 'pointer'
            }}
            >
              Column Title
            </Typography>
            <Box>
              <Tooltip title='More option'>
                <ExpandMoreIcon
                  sx={{
                    color: '#111111',
                    cursor: 'pointer'
                  }}
                  id="basic-column-dropdown"
                  aria-controls={open ? 'basic-menu-columm-dropdown' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                />
              </Tooltip>
              <Menu
                id="basic-menu-columm-dropdown"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-column-dropdown'
                }}
              >
                <MenuItem>
                  <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><BookmarkBorderIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          {/* Box List Card */}
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
              bgcolor: cardBackgroundColor,
              color: cardTextColor,
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
                <Button size="small" startIcon={<GroupIcon />}>12</Button>
                <Button size="small" startIcon={<CommentIcon />}>14</Button>
                <Button size="small" startIcon={<AttachmentIcon />}>16</Button>
              </CardActions>
            </Card>

            <Card sx={{
              bgcolor: cardBackgroundColor,
              color: cardTextColor,
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{
              bgcolor: cardBackgroundColor,
              color: cardTextColor,
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{
              bgcolor: cardBackgroundColor,
              color: cardTextColor,
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{
              bgcolor: cardBackgroundColor,
              color: cardTextColor,
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{
              bgcolor: cardBackgroundColor,
              color: cardTextColor,
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>
                  Card 01
                </Typography>
              </CardContent>
            </Card>

          </Box>
          {/* Box Column Footer */}
          <Box sx={{
            height: COLUMN_FOOTER_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Button startIcon={<AddCardIcon />}>Add new card</Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor: 'pointer' }}/>
            </Tooltip>
          </Box>
        </Box>
      </Box>

    </Box>
  )
}

export default BoardContent
