import { Stack } from '@mui/material'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

export default function SnackbarAlert({ open, message, status }) {
  return (
    <Stack>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        message="Note archived"
        action={() => {}}
      >
        <Alert severity={status ? 'success' : 'error'}>{message}</Alert>
      </Snackbar>
    </Stack>
  )
}
