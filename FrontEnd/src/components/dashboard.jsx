import { Menu as MenuIcon } from '@mui/icons-material'
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useAuth } from '../contexts/authContext'
import { useIsMobile } from '../contexts/isMobileContext'

const drawerWidth = 240

export default function Dashboard({ name, menuItems }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activePage, setActivePage] = useState(menuItems[0].page)
  const { isMobile, theme } = useIsMobile()
  const { logout } = useAuth()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box
        sx={{
          p: 2,
          textAlign: 'center',
          bgcolor: theme.palette.primary.main,
          color: 'white',
        }}
      >
        <Typography variant="h6" sx={{ mt: 1 }}>
          {' '}
          {name}
        </Typography>
      </Box>

      {/* Menu Items */}
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map(({ text, icon, page }) => (
          <ListItem
            key={text}
            onClick={() => {
              if (page === 'Logout') logout()
              else setActivePage(page)
              if (isMobile) setMobileOpen(false)
            }}
            sx={{
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
                cursor: 'pointer',
              },
              backgroundColor:
                activePage === page
                  ? theme.palette.action.selected
                  : 'transparent',
            }}
          >
            <ListItemIcon
              sx={{
                color:
                  activePage === page ? theme.palette.primary.main : 'inherit',
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: 'none',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {activePage}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              borderRight: 'none',
              boxShadow: theme.shadows[2],
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          bgcolor: 'background.default',
        }}
      >
        <Toolbar />

        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: theme.shadows[1],
            minHeight: 'calc(100vh - 100px)',
          }}
        >
          {menuItems.find((item) => item.page === activePage)?.component}
        </Box>
      </Box>
    </Box>
  )
}
