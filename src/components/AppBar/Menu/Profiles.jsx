import Logout from '@mui/icons-material/Logout'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { useConfirm } from 'material-ui-confirm'
import { logoutUserAPI } from '~/redux/user/userSlice'
import { Link } from 'react-router-dom'

function Profiles() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)

  const confirmLogout = useConfirm()
  const handleLogout = () => {
    confirmLogout({
      title: 'Logout',
      description: 'Are you sure you want to logout of your account?',
      confirmationText: 'Logout',
      cancellationText: 'Cancel'
    }).then(() => {
      dispatch(logoutUserAPI())
    }).catch(() => {})
  }
  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ pading: 0 }}
          aria-controls={open ? 'basic-menu-profiles' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{ width: 36, height: 36 }}
            alt={currentUser?.username}
            src={currentUser?.avatar}/>
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu-profiles"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-profiles'
        }}
      >
        <Link to="/settings/account" style={{ color: 'inherit' }}>
          <MenuItem sx ={{ ':hover': { color: 'success.light' } }}>
            <Avatar
              sx={{ width: 32, height: 32, mr: 2 }}
              alt={currentUser?.username}
              src={currentUser?.avatar}
            /> Profile
          </MenuItem>
        </Link> 
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem
          sx={{
            ':hover': {
              color: 'warning.dark',
              '& .logout-icon': { color: 'warning.dark' }
            }
          }}
          onClick={handleLogout}
        >
          <ListItemIcon>
            <Logout fontSize="small" className='logout-icon'/>
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Profiles