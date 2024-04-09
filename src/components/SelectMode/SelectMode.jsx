import Box from '@mui/material/Box'
import { useColorScheme } from '@mui/material/styles'

// Thư viện select
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

// Icon dark mode
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'

// Hàm dark mode
function SelectMode() {
  const { mode, setMode } = useColorScheme()
  const handleChange = (event) => {
    // Bắt sự kiện target
    const selectMode = event.target.value
    // Thực hiện set Mode
    setMode(selectMode)
  }

  return (
    <FormControl size="small" sx={{ minWidth: '120px' }}>
      <InputLabel
        id="label-select-dark-light-mode"
        sx={{
          color: '#F2F2F2BF',
          bgcolor: (theme) => (theme.palette.light),
          '&.Mui-focused': { color: '#F2F2F2BF' }
        }}
      >
        Mode
      </InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
        sx={{
          color: '#F2F2F2BF',
          '.MuiOutlinedInput-notchedOutline': { borderColor: '#F2F2F2BF' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#F2F2F2BF' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#F2F2F2BF' },
          '.MuiSvgIcon-root': { color: '#F2F2F2BF' }
        }}
      >
        <MenuItem value="light">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LightModeIcon fontSize='small'/>
            Light
          </Box>
        </MenuItem>
        <MenuItem value="dark">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DarkModeOutlinedIcon fontSize='small'/>
            Dark
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SettingsBrightnessIcon fontSize='small'/>
            System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}


export default SelectMode
