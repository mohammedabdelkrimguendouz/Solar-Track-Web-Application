import { createContext, useContext, useState } from 'react'
import SnackbarAlert from '../components/snackbarAlert'

const ToastContext = createContext({})

export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [Toast, setToast] = useState({
    message: '',
    status: false,
  })

  function showHideAlert(message, status) {
    setToast({ message: message, status: status })
    setOpen(true)
    setTimeout(() => {
      setOpen(false)
    }, 4000)
  }

  return (
    <ToastContext.Provider value={{ showHideAlert }}>
      <SnackbarAlert
        open={open}
        message={Toast.message}
        status={Toast.status}
      />
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  return useContext(ToastContext)
}
