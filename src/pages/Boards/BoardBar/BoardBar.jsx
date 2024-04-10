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
              src="https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/426496368_777600987734389_4219797515403216014_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=OINZy8Ao6BgAb6f614c&_nc_ht=scontent.fsgn5-15.fna&oh=00_AfC1CoOI8TCbQWQsjYBh4soIEC9cYfJTkjl-W-9Tii_ROQ&oe=6615249A"
            />
          </Tooltip>
          <Tooltip title="quochuy">
            <Avatar
              alt="Nguyen Quoc Huy"
              src="https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/434677489_811165994377888_1074703039215441925_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=I16zsw9fxdYAb418niI&_nc_ht=scontent.fsgn5-15.fna&oh=00_AfAl8dJ6NBKqiK75qgsytNWD2ZPUuFOsYVQxZo9ZD8t3dg&oe=6615379B"
            />
          </Tooltip>
          <Tooltip title="quochuy">
            <Avatar
              alt="Nguyen Quoc Huy"
              src="https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/435170646_406828458643887_5109066831945894142_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=kgs7PBxfc5wAb4EHSOa&_nc_ht=scontent.fsgn5-14.fna&oh=00_AfAYl0tZ0t1IN3jNEjOXJoD9cf-lpnzqUHYufuK6dtugFA&oe=66152C21"
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
              src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/434658451_404351368891596_3943305827844295115_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=8sxVYElmdssAb44paRa&_nc_ht=scontent.fsgn5-9.fna&oh=00_AfCRJvAoyveR57SUcd9eiQ8KV6uACh6Za7bWZKkCa6yG8w&oe=6615118D"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
