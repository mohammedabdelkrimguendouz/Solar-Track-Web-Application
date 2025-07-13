import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BecomeArea from '../components/becomeArea'
import { useAuth } from '../contexts/authContext'
import { useToast } from '../contexts/toastContext'

export default function Login() {
  const { showHideAlert } = useToast()
  const { login } = useAuth()

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [loginData, setLoginData] = useState({
    userName: '',
    password: '',
  })

  function validateForm() {
    if (loginData.userName.trim().length < 5) {
      showHideAlert('username must be at least 5 characters', false)
      return false
    }

    if (loginData.password.trim().length < 8) {
      showHideAlert('password must be at least 8 characters', false)
      return false
    }

    return true
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    if (validateForm()) {
      setLoading(true)
      const type = await login(loginData.userName, loginData.password)
      if (type) {
        showHideAlert('logged in successfully', true)
        navigate(type === 'admin' ? '/admin' : '/leader')
      } else showHideAlert('username or password is incorrect', false)

      setLoading(false)
    }
  }

  return (
    <>
      <BecomeArea />
      <Paper elevation={3} sx={{ maxWidth: 400, margin: 'auto', mb: 6, p: 4 }}>
        <Typography variant="h5" mb={2} align="center">
          Login
        </Typography>

        <Box component="form" display="flex" flexDirection="column" gap={3}>
          <TextField
            label="Username"
            variant="filled"
            fullWidth
            required
            value={loginData.userName}
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
            onChange={(event) => {
              setLoginData({ ...loginData, userName: event.target.value })
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="filled"
            fullWidth
            required
            value={loginData.password}
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
            onChange={(event) => {
              setLoginData({ ...loginData, password: event.target.value })
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </Box>
      </Paper>
    </>
  )
}
