import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import SpeedIcon from '@mui/icons-material/Speed'
import FilterListIcon from '@mui/icons-material/FilterList'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/utilities/formatters'
import BoardUserGroup from './BoardUserGroup'

const CUSTOM_STYLE = {
  color: '#F2F2F2',
  bgcolor: 'transparent',
  border: 'none',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color:'#F2F2F2'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}
function BoardBar({ board }) {
  // // Destructuring
  // const { board } = props
  // const board = props.board
  return (
    <Box sx={{
      bgcolor: (theme) => (theme.palette.mode === 'light' ? '#BABCA7' : '#4C4A45'),
      width: '100%',
      height: (theme) => theme.casani.boarBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      paddingX: 2,
      overflowX: 'auto',
      borderBottom: '1px solid #E2D7C1',
      '&::-webkit-scrollbar-track': { m: 2 }
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Tooltip title={board?.description}>
          <Chip
            sx={CUSTOM_STYLE}
            icon={<SpaceDashboardIcon />}
            label={board?.title}
            clickable
          />
        </Tooltip>
        <Chip
          sx={CUSTOM_STYLE}
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
        />
        <Chip
          sx={CUSTOM_STYLE}
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          clickable
        />
        <Chip
          sx={CUSTOM_STYLE}
          icon={<SpeedIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={CUSTOM_STYLE}
          icon={<FilterListIcon />}
          label="Filter"
          clickable
        />
      </Box>
      <Box sx={{display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined" 
          startIcon={ <PersonAddIcon /> }
          sx={{
            color: '#F2F2F2',
            borderColor: '#F2F2F2',
            '&:hover': { borderColor: '#F2F2F2' }
          }}
        >
          Invite
        </Button>
        {/* Hiển thị user */}
        <BoardUserGroup board={board} />
      </Box>
    </Box>
  )
}

export default BoardBar
