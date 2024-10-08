// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '~/theme.js'

// Cấu hình react-toastify
import { ToastContainer, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// Cấu hình MUI Dialog
import { ConfirmProvider } from 'material-ui-confirm' // Mui Dialogs

// Cấu hình Redux Store
import { Provider } from 'react-redux'
import { store } from '~/redux/store'

// Cấu hình React Router
import { BrowserRouter } from 'react-router-dom'

// Cấu hình Redux Persist
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
const persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter basename='/'>
        <CssVarsProvider theme={theme}>
          <ConfirmProvider defaultOptions={{
            allowClose: false,
            confirmationButtonProps: { color: 'error', variant: 'outlined' },
            cancellationButtonProps: { color: 'inherit', variant: 'outlined' }
          }}>
            <CssBaseline />
            <App />
            <ToastContainer position="top-center" limit={3} newestOnTop={true}/>
          </ConfirmProvider>
        </CssVarsProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
