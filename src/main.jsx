// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '~/theme.js'
import { ToastContainer, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ConfirmProvider } from 'material-ui-confirm' // Mui Dialogs

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <CssVarsProvider theme={theme}>
    <ConfirmProvider defaultOptions={{
      allowClose: false,
      confirmationButtonProps: { color: 'error', variant: 'outlined' },
      cancellationButtonProps: { color: 'inherit', variant: 'outlined'}
    }}>
      <CssBaseline />
      <App />
      <ToastContainer position="top-center" limit={3} newestOnTop={true}/>
    </ConfirmProvider>
  </CssVarsProvider>
  // </React.StrictMode>
)
