import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchBoardsAPI } from '~/apis'

function Starred() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()
  const [starredBoards, setStarredBoards] = useState([])
  
  // Fetch starred boards when component mounts and when menu opens
  useEffect(() => {
    if (open) {
      fetchBoardsAPI('?starred=true').then(res => {
        setStarredBoards(res.boards || [])
      })
    }
  }, [open])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleBoardClick = (boardId) => {
    navigate(`/boards/${boardId}`)
    handleClose()
  }

  // Function to truncate text with ellipsis
  const truncateText = (text, maxLength = 20) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  return (
    <Box>
      <Button
        sx = {{ color: '#F2F2F2BF' }}
        id="basic-button-starred"
        aria-controls={open ? 'basic-menu-starred' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<ExpandMoreIcon />}
      >
        Starred
      </Button>
      <Menu
        id="basic-menu-starred"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-starred'
        }}
      >
        <Typography variant="subtitle2" sx={{ px: 2, pt: 1, pb: 0.5, fontWeight: 'bold' }}>
          Starred boards
        </Typography>

        {starredBoards.length === 0 ? (
          <Box sx={{ 
            px: 2, 
            py: 1,
            mx: 1
          }}>
            <Typography variant="body2" color="text.secondary">
              No starred boards
            </Typography>
          </Box>
        ) : (
          <Box sx={{ 
            maxHeight: '300px', 
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#bdbdbd',
              borderRadius: '4px'
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent'
            }
          }}>
            {starredBoards.map(board => (
              <Box
                key={board._id}
                onClick={() => handleBoardClick(board._id)}
                sx={{ 
                  px: 2, 
                  py: 1, 
                  display: 'flex', 
                  alignItems: 'center',
                  borderRadius: 1,
                  mx: 1,
                  '&:hover': { bgcolor: 'action.hover' },
                  cursor: 'pointer'
                }}
              >
                <ListItemIcon>
                  <SpaceDashboardIcon fontSize="small" sx={{ 
                    color: board.type === 'public' ? 'primary.main' : 'secondary.main' 
                  }} />
                </ListItemIcon>
                <Typography 
                  sx={{ 
                    color: 'text.primary', 
                    fontWeight: 'medium',
                    maxWidth: '160px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                  title={board.title} // Show full title on hover
                >
                  {truncateText(board.title)}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Menu>
    </Box>
  )
}

export default Starred