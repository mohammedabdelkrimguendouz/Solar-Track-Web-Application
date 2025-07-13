import {
  Build as BuildIcon,
  Dashboard as DashboardIcon,
  Lock as LockIcon,
  Logout as LogoutIcon,
  People as PeopleIcon,
  Person as PersonIcon,
} from '@mui/icons-material'
import Dashboard from '../../components/dashboard'
import ChangePassword from '../changePassword'
import Profile from '../profile'
import DashboardStatistics from './dashboardStatistics'
import Leaders from './leaders'
import Projects from './projects'

export default function Admin() {
  const adminMenuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      page: 'Dashboard',
      component: <DashboardStatistics />,
    },
    {
      text: 'Leaders',
      icon: <PeopleIcon />,
      page: 'Leaders',
      component: <Leaders />,
    },
    {
      text: 'Projects',
      icon: <BuildIcon />,
      page: 'Projects',
      component: <Projects />,
    },
    {
      text: 'Profile',
      icon: <PersonIcon />,
      page: 'Profile',
      component: <Profile />,
    },
    {
      text: 'Change Password',
      icon: <LockIcon />,
      page: 'Change Password',
      component: <ChangePassword />,
    },
    {
      text: 'Logout',
      icon: <LogoutIcon />,
      page: 'Logout',
    },
  ]
  return <Dashboard name="Admin" menuItems={adminMenuItems} />
}
