import {
  CheckCircle,
  Leaderboard,
  People,
  ShowChart,
  SolarPower,
  Timeline,
} from '@mui/icons-material'
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
  useTheme,
} from '@mui/material'
import { useEffect, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useToast } from '../../contexts/toastContext'
import { getDashboardStatistics } from '../../services/projectApi'

const COLORS = ['#1976d2', '#2e7d32', '#ff9800', '#d32f2f', '#00C49F']

export default function DashboardStatistics() {
  const [loading, setLoading] = useState(true)
  const { showHideAlert } = useToast()
  const [stats, setStats] = useState(null)
  const theme = useTheme()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStatistics()
        if (res) setStats(res)
      } catch {
        showHideAlert('Error loading dashboard statistics', false)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="300px"
      >
        <CircularProgress size={60} />
      </Box>
    )
  }

  if (!stats) {
    return (
      <Typography align="center" variant="h6" color="error" py={4}>
        Failed to load dashboard data
      </Typography>
    )
  }

  const leaderProjectData =
    stats.projects_per_leader?.map((item) => ({
      name: item.leader__username,
      projects: item.project_count,
    })) || []

  const projectStatusData = [
    { name: 'Completed', value: stats.completed_projects },
    { name: 'In Progress', value: stats.inCompleted_projects },
  ]

  const summaryCards = [
    {
      label: 'Total Projects',
      value: stats.total_projects,
      icon: <Leaderboard fontSize="large" color="primary" />,
      color: theme.palette.primary.main,
    },
    {
      label: 'Completed',
      value: stats.completed_projects,
      icon: <CheckCircle fontSize="large" style={{ color: '#4caf50' }} />,
      color: '#4caf50',
    },
    {
      label: 'In Progress',
      value: stats.inCompleted_projects,
      icon: <Timeline fontSize="large" style={{ color: '#ff9800' }} />,
      color: '#ff9800',
    },
    {
      label: 'Total Leaders',
      value: stats.total_leaders,
      icon: <People fontSize="large" style={{ color: '#2196f3' }} />,
      color: '#2196f3',
    },
    {
      label: 'Panels Installed',
      value: stats.total_panels_installed.toLocaleString(),
      icon: <SolarPower fontSize="large" style={{ color: '#9c27b0' }} />,
      color: '#9c27b0',
    },
    {
      label: 'Avg Panels/Project',
      value: stats.avg_panels_per_project,
      icon: <ShowChart fontSize="large" style={{ color: '#607d8b' }} />,
      color: '#607d8b',
    },
  ]

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1800, margin: '0 auto' }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{
          fontWeight: 700,
          mb: 4,
          color: theme.palette.primary.dark,
          fontSize: { xs: '1.8rem', sm: '2.2rem' },
        }}
      >
        Solar Projects Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 5 }}>
        {summaryCards.map((item, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={idx}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 2,
                boxShadow: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 4,
                },
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 3,
                }}
              >
                <Box
                  sx={{
                    bgcolor: `${item.color}20`,
                    p: 2,
                    mb: 2,
                    borderRadius: '50%',
                    display: 'inline-flex',
                  }}
                >
                  {item.icon}
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  {item.label}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <Card sx={{ borderRadius: 2, boxShadow: 3, height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  color: theme.palette.primary.dark,
                }}
              >
                Projects Distribution by Leader
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={leaderProjectData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="projects" fill="#1976d2" name="Projects" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card sx={{ borderRadius: 2, boxShadow: 3, height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  color: theme.palette.primary.dark,
                }}
              >
                Project Status Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={projectStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    <Cell fill="#4caf50" />
                    <Cell fill="#ff9800" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
