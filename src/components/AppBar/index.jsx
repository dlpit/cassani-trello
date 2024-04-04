import Box from '@mui/material/Box'
import SelectMode from '~/components/SelectMode'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as casaniLogo } from '~/assets/casani.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import WorkSpaces from './Menu/WorkSpaces'
import Recent from './Menu/Recent'
import Templates from './Menu/Templates'
import Starred from './Menu/Starred'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profiles from './Menu/Profiles'


function AppBar() {
  return (
    <Box px={2} sx={{
      width: '100%',
      height: (theme) => theme.casani.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
        <AppsIcon sx={{ color: 'primary.main' }} />
        <Box sx={{display: 'flex', alignItems: 'center', gap: 0.5}}>
          <SvgIcon component={casaniLogo} inheritViewBox />
          <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight:'Bold' }}
          >Cassani</Typography>
        </Box>
        <WorkSpaces />
        <Recent />
        <Starred />
        <Templates />

        <Button variant="outlined">Create</Button>
      </Box>
      <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
        <TextField id="outlined-search" label="Search ..." type="search" size='small'/>
        <SelectMode />
        <Tooltip title="Notifycation">
          <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon />
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ cursor: 'pointer' }}/>
        </Tooltip>
        <Profiles />
      </Box>
    </Box>
  )
}

export default AppBar
