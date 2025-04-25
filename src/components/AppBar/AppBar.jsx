import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import AppsIcon from '@mui/icons-material/Apps'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import SvgIcon from '@mui/material/SvgIcon'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as casaniLogo } from '~/assets/casani.svg'
import SelectMode from '~/components/SelectMode/SelectMode'
import Profiles from './Menu/Profiles'
import Recent from './Menu/Recent'
import Starred from './Menu/Starred'
import Templates from './Menu/Templates'
import WorkSpaces from './Menu/WorkSpaces'
import Notifications from './Notifications'
import AutoCompleteSearchBoard from './SearchBoards/AutoCompleteSearchBoard'

function AppBar() {
  const [searchValue, setSearchValue] = useState('')
  return (
    <Box sx={{
      bgcolor: (theme) => (theme.palette.mode === 'light' ? '#786D60' : '#212121'),
      width: '100%',
      height: (theme) => theme.casani.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      paddingX: 2,
      overflowX: 'auto',
      '&::-webkit-scrollbar-track': { m: 2 }
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color: '#F2F2F2BF' }} />
        <Link to="/" style={{ color: 'inherit' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SvgIcon component={ casaniLogo } inheritViewBox />
            <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight:'Bold', color: (theme) => (theme.palette.mode === 'light' ? '#FFFFFF' : '#F1E7D8') }}
            >assani</Typography>
          </Box>
        </Link>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <WorkSpaces />
          <Recent />
          <Starred />
          <Templates />
          <Button
            sx = {{
              color: '#F2F2F2BF'
            }}
            startIcon={ <AddCircleOutlineIcon /> }
          >
            Create
          </Button>
        </Box>
      </Box> 
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AutoCompleteSearchBoard />
        <SelectMode />
        {/* Xử lý Notifications */}
        <Notifications />

        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ cursor: 'pointer', color: '#F2F2F2BF' }}/>
        </Tooltip>
        <Profiles />
      </Box>
    </Box>
  )
}

export default AppBar
