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
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import WorkspacesIcon from '@mui/icons-material/Workspaces'
import AddIcon from '@mui/icons-material/Add'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import { Link } from 'react-router-dom'

function WorkSpaces() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <Button
        sx = {{ color: '#F2F2F2BF' }}
        id="basic-button-workspaces"
        aria-controls={open ? 'basic-menu-workspaces' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<ExpandMoreIcon />}
      >
        Workspaces
      </Button>
      <Menu
        id="basic-menu-workspaces"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-workspaces'
        }}
      >
        {/* Không gian làm việc hiện tại (Current Workspace) */}
        <Typography variant="subtitle2" sx={{ px: 2, pt: 1, pb: 0.5, fontWeight: 'bold' }}>
          Không gian làm việc hiện tại
        </Typography>
        <Box sx={{ 
          px: 2, 
          py: 1, 
          display: 'flex', 
          alignItems: 'center',
          bgcolor: 'action.selected',
          borderRadius: 1,
          mx: 1
        }}>
          <ListItemIcon>
            <SpaceDashboardIcon fontSize="small" sx={{ color: 'primary.main' }} />
          </ListItemIcon>
          <Typography sx={{ color: 'text.primary', fontWeight: 'medium' }}>
            Casani Trello
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />

        {/* Không gian làm việc của bạn (Your Workspaces) */}
        <Typography variant="subtitle2" sx={{ px: 2, pt: 1, pb: 0.5, fontWeight: 'bold' }}>
          Không gian làm việc của bạn
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
              <SpaceDashboardIcon fontSize="small" sx={{ color: 'primary.main' }} />
            </ListItemIcon>
            <Typography sx={{ color: 'text.primary', fontWeight: 'medium' }}>
              Casani Trello
            </Typography>
          </Box>
        </Link>
      </Menu>
    </Box>
  )
}

export default WorkSpaces