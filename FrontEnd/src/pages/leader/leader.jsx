import {
  Lock as LockIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Build as ProjectIcon,
} from '@mui/icons-material'
import Dashboard from '../../components/dashboard'
import ChangePassword from '../changePassword'
import Profile from '../profile'
import LeaderProjects from './leaderProjects'

export default function Leader() {
  const leaderMenuItems = [
    {
      text: 'Projects',
      icon: <ProjectIcon />,
      page: 'Projects',
      component: <LeaderProjects />,
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
  return <Dashboard name="Leader" menuItems={leaderMenuItems} />
}
