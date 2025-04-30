import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import SpeedIcon from '@mui/icons-material/Speed'
import FilterListIcon from '@mui/icons-material/FilterList'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import Tooltip from '@mui/material/Tooltip'
import { capitalizeFirstLetter } from '~/utilities/formatters'
import BoardUserGroup from './BoardUserGroup'
import InviteBoardUser from './InviteBoardUser'
import { useDispatch } from 'react-redux'
import { toggleBoardStar } from '~/redux/activeBoard/activeBoardSlice'

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
  const dispatch = useDispatch()

  const handleToggleStar = () => {
    dispatch(toggleBoardStar(board?._id))
  }

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
        <Tooltip title={board?.starred ? 'Remove from starred' : 'Add to starred'}>
          <Chip
            sx={CUSTOM_STYLE}
            icon={board?.starred ? <StarIcon sx={{ color: '#F8D146 !important' }} /> : <StarBorderIcon />}
            label="Star"
            clickable
            onClick={handleToggleStar}
          />
        </Tooltip>
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
        {/* Xử lý mời user vào làm thành viên của cái board */}
        <InviteBoardUser boardId={board._id} />
        {/* Hiển thị user */}
        <BoardUserGroup boardUsers={board.FE_allUsers} />
      </Box>
    </Box>
  )
}

export default BoardBar
