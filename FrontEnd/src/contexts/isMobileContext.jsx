import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { createContext, useContext } from 'react'

const IsMobileContext = createContext({})

export const IsMobileProvider = ({ children }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <IsMobileContext.Provider value={{ isMobile, theme }}>
      {children}
    </IsMobileContext.Provider>
  )
}

export const useIsMobile = () => {
  return useContext(IsMobileContext)
}
