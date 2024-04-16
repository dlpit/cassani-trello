import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import SpeedIcon from '@mui/icons-material/Speed'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/utilities/formatters'

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
        <Chip
          sx={CUSTOM_STYLE}
          icon={<SpaceDashboardIcon />}
          label={board?.title}
          clickable
        />
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
        <AvatarGroup
          max={4}
          sx={{
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              fontSize: 16,
              color: '#F2F2F2',
              cursor: 'pointer',
              '&: first-of-type': { bgcolor: '#A5917B' }
            }
          }}
        >
          <Tooltip title="quochuy">
            <Avatar
              alt="Nguyen Quoc Huy"
              src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/11/avatar-dep-89.jpg"
            />
          </Tooltip>
          <Tooltip title="quochuy">
            <Avatar
              alt="Nguyen Quoc Huy"
              src="https://i.pinimg.com/474x/79/d3/1e/79d31e406fe3d3d7322b18666184911d.jpg"
            />
          </Tooltip>
          <Tooltip title="quochuy">
            <Avatar
              alt="Nguyen Quoc Huy"
              src="https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Bo-suu-tap-anh-avatar-anime-nu-co-gai-bang-do-do.jpg?1704789148675"
            />
          </Tooltip>
          <Tooltip title="quochuy">
            <Avatar
              alt="Nguyen Quoc Huy"
              src="https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-6/434662616_406655395327860_1999765478975196741_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=BtG-Yx3I-boAb7uTw3D&_nc_ht=scontent.fsgn5-8.fna&oh=00_AfDBefURc2qTj8-dYj8Sftrnx3Opv70JsBgzveIEXeYEMA&oe=6615120B"
            />
          </Tooltip>
          <Tooltip title="quochuy">
            <Avatar
              alt="Nguyen Quoc Huy"
              src="https://toigingiuvedep.vn/wp-content/uploads/2022/11/avatar-dep-nu-cho-con-gai.jpg"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
