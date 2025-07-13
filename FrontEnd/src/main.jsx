import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { store } from './app/store'
import { AuthProvider } from './contexts/authContext.jsx'
import { IsMobileProvider } from './contexts/isMobileContext.jsx'
import { ToastProvider } from './contexts/toastContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ToastProvider>
          <IsMobileProvider>
            <Provider store={store}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <App />
              </LocalizationProvider>
            </Provider>
          </IsMobileProvider>
        </ToastProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
