import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import { useAuth } from '../contexts/authContext'
import { useToast } from '../contexts/toastContext'
import { changePassword } from '../services/userApi'

export default function ChangePassword() {
  const { showHideAlert } = useToast()
  const [loading, setLoading] = useState(false)
  const [passwords, setPasswords] = useState({
    old_password: '',
    new_password: '',
  })
  const { accessToken } = useAuth()

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await changePassword(passwords, accessToken)
    if (res) {
      showHideAlert('Password changed successfully', true)
      setPasswords({ old_password: '', new_password: '' })
    } else {
      showHideAlert('Failed to change password', false)
    }
    setLoading(false)
  }

  return (
    <Container sx={{ py: 4 }}>
      <Card>
        <CardContent>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap={3}
            onSubmit={handlePasswordChange}
          >
            <TextField
              label="Current Password"
              type="password"
              name="old_password"
              variant="filled"
              required
              value={passwords.old_password}
              onChange={(e) =>
                setPasswords({ ...passwords, old_password: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="New Password"
              type="password"
              name="new_password"
              variant="filled"
              required
              value={passwords.new_password}
              onChange={(e) =>
                setPasswords({ ...passwords, new_password: e.target.value })
              }
              fullWidth
            />
            <Box mt={4}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Change Password'
                )}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}
