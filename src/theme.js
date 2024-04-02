import { deepOrange, orange, teal, cyan } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = extendTheme({
  casani: {
    appBarHeight: '48px',
    boarBarHeight: '56px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange
      }
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange
      }
    }
  }
  // ...other properties
})

export default theme
