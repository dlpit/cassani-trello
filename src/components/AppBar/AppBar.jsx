import { useState } from 'react'
import Box from '@mui/material/Box'
import SelectMode from '~/components/SelectMode/SelectMode'
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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon component={ casaniLogo } inheritViewBox />
          <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight:'Bold', color: (theme) => (theme.palette.mode === 'light' ? '#FFFFFF' : '#F1E7D8') }}
          >assani</Typography>
        </Box>
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
        <TextField
          id="outlined-search"
          label="Search ..."
          type="text"
          size='small'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#F2F2F2BF' }}/>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <CloseIcon
                  fontSize='small'
                  sx={{ color: searchValue ? '#F2F2F2BF' : 'transparent', cursor: 'pointer' }}
                  onClick={() => setSearchValue('')}
                />
              </InputAdornment>
            )
          }}
          sx={{
            minWidth: '120px',
            maxWidth: '180px',
            '& label': { color: '#F2F2F2BF' },
            '& input': { color: '#F2F2F2BF' },
            '& label.Mui-focused': { color: '#F2F2F2BF' },
            '& .MuiOutlinedInput-root':{
              '& fieldset': {
                borderColor: '#F2F2F2BF'
              },
              '&:hover fieldset': {
                borderColor: '#F2F2F2BF'
              },
              '&.Mui-focused fieldset': {
                borderColor: '#F2F2F2BF'
              }
            }
          }}
        />
        <SelectMode />
        <Tooltip title="Notifycation">
          <Badge color="warning" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: '#F2F2F2BF' }}/>
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ cursor: 'pointer', color: '#F2F2F2BF' }}/>
        </Tooltip>
        <Profiles />
      </Box>
    </Box>
  )
}

export default AppBar
