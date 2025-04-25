import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import { useEffect, useState, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'

function Recent() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()
  const [recentBoards, setRecentBoards] = useState([])
  const currentBoard = useSelector(selectCurrentActiveBoard)
  
  // Load recent boards from localStorage when component mounts
  useEffect(() => {
    const storedRecentBoards = localStorage.getItem('recentBoards')
    if (storedRecentBoards) {
      setRecentBoards(JSON.parse(storedRecentBoards))
    }
  }, [])

  // Memoise the updateRecentBoards function to prevent dependency issues
  const updateRecentBoards = useCallback((board) => {
    if (!board || !board._id) return

    setRecentBoards(prevBoards => {
      // Create a new array removing any existing instance of this board
      const filteredBoards = prevBoards.filter(b => b._id !== board._id)
      
      // Add the current board to the front of the array
      const updatedRecentBoards = [
        { _id: board._id, title: board.title, type: board.type },
        ...filteredBoards
      ].slice(0, 10) // Keep up to 10 most recent boards
      
      // Update localStorage
      localStorage.setItem('recentBoards', JSON.stringify(updatedRecentBoards))
      
      return updatedRecentBoards
    })
  }, [])

  // Update recent boards when a new board is viewed
  useEffect(() => {
    if (currentBoard) {
      updateRecentBoards(currentBoard)
    }
  }, [currentBoard, updateRecentBoards])

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
  const truncateText = (text, maxLength = 25) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }

  return (
    <Box>
      <Button
        sx={{ color: '#F2F2F2BF' }}
        id="basic-button-recent"
        aria-controls={open ? 'basic-menu-recent' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<ExpandMoreIcon />}
      >
        Recent
      </Button>
      <Menu
        id="basic-menu-recent"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-recent'
        }}
      >
        {/* Recently viewed boards */}
        <Typography variant="subtitle2" sx={{ px: 2, pt: 1, pb: 0.5, fontWeight: 'bold' }}>
          Recently viewed boards
        </Typography>

        {recentBoards.length === 0 ? (
          <Box sx={{ 
            px: 2, 
            py: 1,
            mx: 1
          }}>
            <Typography variant="body2" color="text.secondary">
              No recent boards
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
            {recentBoards.map(board => (
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

        <Divider sx={{ my: 1 }} />
        
        {/* View all boards */}
        <Typography variant="subtitle2" sx={{ px: 2, pt: 1, pb: 0.5, fontWeight: 'bold' }}>
          More options
        </Typography>
        <Link to="/boards" style={{ color: 'inherit', textDecoration: 'none' }}>
          <Box sx={{ 
            px: 2, 
            py: 1, 
            display: 'flex', 
            alignItems: 'center',
            borderRadius: 1,
            mx: 1,
            '&:hover': { bgcolor: 'action.hover' },
            cursor: 'pointer'
          }} onClick={handleClose}>
            <ListItemIcon>
              <AccessTimeIcon fontSize="small" sx={{ color: 'info.main' }} />
            </ListItemIcon>
            <Typography sx={{ color: 'text.primary', fontWeight: 'medium' }}>
              View all boards
            </Typography>
          </Box>
        </Link>
      </Menu>
    </Box>
  )
}

export default Recent