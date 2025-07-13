import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useToast } from '../contexts/toastContext'
import { getUserInfo, updateUserInfo } from '../services/userApi'

export default function Profile() {
  const { showHideAlert } = useToast()
  const [previewUrl, setPreviewUrl] = useState(null)
  const [loading, setLoading] = useState()
  const [user, setUser] = useState({
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    photo: '',
    username: '',
    is_active: '',
    user_type: '',
  })
  const [file, setFile] = useState(null)

  const fetchData = async () => {
    const data = await getUserInfo()
    if (data) {
      
      setUser(data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleUploadImage = (e) => {
    const file = e.target.files[0]
    setFile(file)

    const url = URL.createObjectURL(file)
    setPreviewUrl(url)

    return () => URL.revokeObjectURL(url)
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('email', user.email)
    formData.append('first_name', user.first_name)
    formData.append('last_name', user.last_name)
    formData.append('phone', user.phone)
    formData.append('username', user.username)
    formData.append('is_active', user.is_active)
    formData.append('user_type', user.user_type)
    if (file) {
      formData.append('photo', file)
    }

    setLoading(true)
    const updated = await updateUserInfo(formData)
    if (updated) {
      showHideAlert('Updated profile successfully', true)
      setUser(updated)
    } else {
      showHideAlert('Failed to update profile', false)
    }
    setLoading(false)
  }

  return (
    <Container sx={{ py: 4 }}>
      <Card>
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            gap={3}
            mb={3}
            flexDirection={'column'}
          >
            <Avatar
              alt="Profile"
              src={
                previewUrl ? previewUrl : user.photo || '/default-avatar.png'
              }
              sx={{ width: 80, height: 80 }}
            />
            <Button variant="outlined" component="label">
              Upload New
              <input hidden type="file" onChange={handleUploadImage} />
            </Button>
          </Box>

          <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap={3}
            onSubmit={handleSubmit}
          >
            <TextField
              label="First Name"
              name="first_name"
              variant="filled"
              value={user?.first_name}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Last Name"
              name="last_name"
              value={user?.last_name}
              onChange={handleChange}
              variant="filled"
              fullWidth
              required
            />

            <TextField
              label="Username"
              name="username"
              value={user?.username}
              onChange={handleChange}
              fullWidth
              variant="filled"
              required
            />

            <TextField
              label="Email"
              name="email"
              value={user?.email}
              onChange={handleChange}
              fullWidth
              variant="filled"
              required
            />

            <TextField
              label="Phone"
              name="phone"
              value={user?.phone}
              onChange={handleChange}
              fullWidth
              variant="filled"
              required
            />

            <Box mt={4}>
              <Button type="submit" variant="contained" fullWidth>
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Save Change'
                )}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}
