import { Avatar, Box, Button, CircularProgress, TextField } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TableLeaders from '../../components/tableLeaders'
import { useIsMobile } from '../../contexts/isMobileContext'
import { useToast } from '../../contexts/toastContext'
import {
  addLeader,
  deleteLeader,
  fetchLeaders,
  toggleLeaderStatus,
} from '../../features/leaders/leadersApiSlice'

export default function Leaders() {
  const { showHideAlert } = useToast()
  const dispatch = useDispatch()
  const { leaders, isLoading, error, isAddingLeader, isDeletingLeader } =
    useSelector((state) => state.leaders)

  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [leader, setLeader] = useState(null)
  const [leaderForm, setLeaderForm] = useState({
    username: '',
    password: '',
    user_type: 'leader',
  })

  const { isMobile } = useIsMobile()

  useEffect(() => {
    dispatch(fetchLeaders())
  }, [dispatch])

  useEffect(() => {
    if (error) {
      showHideAlert(error, false)
    }
  }, [error, showHideAlert])

  const handleDeleteLeader = async () => {
    try {
      await dispatch(deleteLeader(leader.id)).unwrap()

      showHideAlert('Leader deleted successfully', true)
      handleCloseDeleteDialog()
    } catch {
      showHideAlert('Failed to delete leader', false)
    }
  }

  const validateLeaderForm = () => {
    if (leaderForm.username.length < 4) {
      showHideAlert('Username must be at least 4 characters long', false)
      return false
    }
    if (leaderForm.password.length < 8) {
      showHideAlert('Password must be at least 8 characters long', false)
      return false
    }
    return true
  }

  const handleAddLeader = async () => {
    if (!validateLeaderForm()) return

    try {
      const result = await dispatch(addLeader(leaderForm)).unwrap()
      if (result) {
        showHideAlert('Leader added successfully', true)
        handleCloseAddDialog()
        setLeaderForm({
          username: '',
          password: '',
          user_type: 'leader',
        })
      }
    } catch {
      showHideAlert('Failed to add leader', false)
    }
  }

  const handleCloseViewDialog = () => setShowViewDialog(false)
  const handleCloseAddDialog = () => setShowAddDialog(false)
  const handleCloseDeleteDialog = () => setShowDeleteDialog(false)

  const handleOpenAddDialog = (selectedLeader) => {
    setLeader(selectedLeader)
    setShowAddDialog(true)
  }

  const handleOpenViewDialog = (selectedLeader) => {
    setLeader(selectedLeader)
    setShowViewDialog(true)
  }

  const handleOpenDeleteDialog = (selectedLeader) => {
    setLeader(selectedLeader)
    setShowDeleteDialog(true)
  }

  const handleToggleStatus = async (selectedLeader) => {
    setLeader(selectedLeader)
    try {
      await dispatch(toggleLeaderStatus(selectedLeader.id)).unwrap()
      showHideAlert('Leader status toggled successfully', true)
    } catch {
      showHideAlert('Failed to toggle leader status', false)
    }
  }

  return (
    <Box p={isMobile ? 1 : 4}>
      {/* Delete Dialog */}
      <Dialog
        open={showDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Confirm Delete'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this leader?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>No</Button>
          <Button
            onClick={handleDeleteLeader}
            autoFocus
            disabled={isDeletingLeader}
          >
            {isDeletingLeader ? (
              <CircularProgress size={20} color="primary" />
            ) : (
              'Yes'
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Dialog */}
      <Dialog
        open={showAddDialog}
        onClose={handleCloseAddDialog}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault()
              handleAddLeader()
            },
          },
        }}
      >
        <DialogTitle>Add Leader</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="username"
            name="username"
            label="User Name"
            type="text"
            fullWidth
            minLength={4}
            helperText="Username must be at least 4 characters long"
            variant="filled"
            value={leaderForm.username}
            onChange={(event) => {
              setLeaderForm({ ...leaderForm, username: event.target.value })
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            required
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            minLength={8}
            helperText="Password must be at least 8 characters long"
            variant="filled"
            value={leaderForm.password}
            onChange={(event) => {
              setLeaderForm({ ...leaderForm, password: event.target.value })
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button type="submit" disabled={isAddingLeader}>
            {isAddingLeader ? (
              <CircularProgress size={20} color="primary" />
            ) : (
              'Add'
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Dialog */}

      <Dialog
        open={showViewDialog}
        onClose={handleCloseViewDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Leader Details</DialogTitle>
        <DialogContent>
          {leader && (
            <Box
              sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar
                  src={leader.photo || '/default-avatar.png'}
                  sx={{ width: 100, height: 100 }}
                />
              </Box>

              <DialogContentText>
                <strong>Username:</strong> {leader.username}
              </DialogContentText>

              <DialogContentText>
                <strong>Name:</strong> {leader.first_name} {leader.last_name}
              </DialogContentText>

              <DialogContentText>
                <strong>Email:</strong> {leader.email || 'N/A'}
              </DialogContentText>

              <DialogContentText>
                <strong>Phone:</strong> {leader.phone}
              </DialogContentText>

              <DialogContentText>
                <strong>Status:</strong>
                <Box
                  component="span"
                  color={leader.is_active ? 'success.main' : 'error.main'}
                  sx={{ ml: 1 }}
                >
                  {leader.is_active ? 'Active' : 'Inactive'}
                </Box>
              </DialogContentText>

              <DialogContentText>
                <strong>User Type:</strong> {leader.user_type}
              </DialogContentText>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Table */}
      {isLoading ? (
        <CircularProgress size={20} color="primary" />
      ) : (
        <TableLeaders
          leaders={leaders}
          toggleStatus={handleToggleStatus}
          deletedLeader={handleOpenDeleteDialog}
          viewLeader={handleOpenViewDialog}
          addLeader={handleOpenAddDialog}
        />
      )}
    </Box>
  )
}
