import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import BecomeArea from '../components/becomeArea'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <>
      <BecomeArea />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        p={4}
      >
        <Typography variant="h2" gutterBottom>
          404
        </Typography>
        <Typography variant="h6" gutterBottom>
          Page Not Found
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Go Home
        </Button>
      </Box>
    </>
  )
}
