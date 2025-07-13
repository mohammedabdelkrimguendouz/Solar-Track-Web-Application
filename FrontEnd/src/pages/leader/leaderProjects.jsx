import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import TableLeaderProjects from '../../components/tableLeaderProjects'
import { useIsMobile } from '../../contexts/isMobileContext'
import { useToast } from '../../contexts/toastContext'
import {
  addProgress,
  getLeaderProjects as getLeaderProjectsApi,
} from '../../services/projectApi'

export default function LeaderProjects() {
  const { showHideAlert } = useToast()
  const [leaderProjects, setLeaderProjects] = useState([])
  const [loading, setLoading] = useState(true)

  const [showViewDialog, setShowViewDialog] = useState(false)
  const [showAddProgressDialog, setShowAddProgressDialog] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [progressForm, setProgressForm] = useState({
    panels_installed: 0,
    notes: '',
    report_date: dayjs(),
  })

  const { isMobile } = useIsMobile()

  const fetchLeaderProjects = async () => {
    const res = await getLeaderProjectsApi()
    if (res) setLeaderProjects(res)
    setLoading(false)
  }

  useEffect(() => {
    fetchLeaderProjects()
  }, [])

  const handleCloseAddProgressDialog = () => {
    setShowAddProgressDialog(false)
    setProgressForm({
      panels_installed: 0,
      notes: '',
      report_date: dayjs(),
    })
  }
  const validateProgressForm = () => {
    if (progressForm.panels_installed < 1) {
      showHideAlert('Number of panels must be at least 1', false)
      return false
    }

    return true
  }

  const handleAddProgress = async () => {
    if (!validateProgressForm()) return

    const progress = {
      panels_installed: progressForm.panels_installed,
      notes: progressForm.notes,
      report_date: progressForm.report_date.format('YYYY-MM-DD'),
      project: selectedProject.id,
    }

    try {
      setLoading(true)
      const result = await addProgress(progress)
      if (result) {
        showHideAlert('Progress added successfully', true)
        await fetchLeaderProjects()
      }
    } catch {
      showHideAlert('Failed to add progress', false)
    }
    setLoading(false)
    handleCloseAddProgressDialog()
  }

  const handleCloseViewDialog = () => setShowViewDialog(false)

  const handleOpenViewDialog = (selectedProject) => {
    setSelectedProject(selectedProject)
    setShowViewDialog(true)
  }

  const handleOpenAddProgressDialog = (selectedProject) => {
    setSelectedProject(selectedProject)
    setShowAddProgressDialog(true)
  }

  return (
    <Box p={isMobile ? 1 : 4}>
      {/* Add Progress Dialog */}
      <Dialog
        open={showAddProgressDialog}
        onClose={handleCloseAddProgressDialog}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault()
              handleAddProgress()
            },
          },
        }}
      >
        <DialogTitle>Add Progress</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="panels_installed"
            name="panels_installed"
            label="Panels Installed"
            type="number"
            fullWidth
            variant="filled"
            value={progressForm.panels_installed}
            onChange={(event) => {
              setProgressForm({
                ...progressForm,
                panels_installed: event.target.value,
              })
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="notes"
            name="notes"
            label="Notes"
            type="text"
            fullWidth
            variant="filled"
            multiline
            rows={3}
            value={progressForm.notes}
            onChange={(event) => {
              setProgressForm({
                ...progressForm,
                notes: event.target.value,
              })
            }}
          />
          <Box sx={{ display: 'flex', gap: 2, mb: 2, mt: 2 }}>
            <DatePicker
              label="Report Date"
              required
              value={
                progressForm.report_date
                  ? dayjs(progressForm.report_date)
                  : null
              }
              onChange={(newValue) =>
                setProgressForm((prev) => ({
                  ...prev,
                  report_date: newValue ? newValue.format('YYYY-MM-DD') : null,
                }))
              }
              slotProps={{
                textField: {
                  fullWidth: true,
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddProgressDialog}>Cancel</Button>
          <Button type="submit" disabled={loading}>
            {loading ? <CircularProgress size={20} color="primary" /> : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Dialog */}

      <Dialog
        open={showViewDialog}
        onClose={handleCloseViewDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Project Details</DialogTitle>
        <DialogContent>
          {selectedProject && (
            <Box
              sx={{ display: 'flex', flexDirection: 'column', gap: 3, py: 2 }}
            >
              {/* معلومات المشروع الأساسية */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: 3,
                }}
              >
                {/* القسم الأول */}
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 'bold' }}
                  >
                    Project Information
                  </Typography>

                  <Stack spacing={1.5}>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Project Name
                      </Typography>
                      <Typography>{selectedProject.name}</Typography>
                    </Box>

                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Description
                      </Typography>
                      <Typography>{selectedProject.description}</Typography>
                    </Box>

                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Status
                      </Typography>
                      <Chip
                        label={
                          selectedProject.status ? 'Completed' : 'In Progress'
                        }
                        color={selectedProject.status ? 'success' : 'error'}
                        size="small"
                      />
                    </Box>
                  </Stack>
                </Box>

                {/* القسم الثاني */}
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 'bold' }}
                  >
                    Timeline
                  </Typography>

                  <Stack spacing={1.5}>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Start Date
                      </Typography>
                      <Typography>
                        {new Date(
                          selectedProject.start_date
                        ).toLocaleDateString()}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        End Date
                      </Typography>
                      <Typography>
                        {new Date(
                          selectedProject.end_date
                        ).toLocaleDateString()}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Number of Panels
                      </Typography>
                      <Typography>
                        {selectedProject.number_of_panels.toLocaleString()}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Box>

              {/* معلومات القائد */}
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 'bold' }}
                >
                  Project Leader
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                    p: 2,
                    bgcolor: 'action.hover',
                    borderRadius: 1,
                  }}
                >
                  <Avatar
                    src={selectedProject.leader.photo || '/default-avatar.png'}
                    sx={{ width: 72, height: 72 }}
                  />

                  <Stack spacing={1}>
                    <Typography variant="subtitle1">
                      {selectedProject.leader.first_name}{' '}
                      {selectedProject.leader.last_name}
                    </Typography>

                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {selectedProject.leader.user_type} •
                        <Box
                          component="span"
                          color={
                            selectedProject.leader.is_active
                              ? 'success.main'
                              : 'error.main'
                          }
                          sx={{ ml: 1 }}
                        >
                          {selectedProject.leader.is_active
                            ? 'Active'
                            : 'Inactive'}
                        </Box>
                      </Typography>
                    </Box>

                    <Typography variant="body2">
                      <EmailIcon
                        fontSize="small"
                        sx={{ verticalAlign: 'middle', mr: 1 }}
                      />
                      {selectedProject.leader.email}
                    </Typography>

                    <Typography variant="body2">
                      <PhoneIcon
                        fontSize="small"
                        sx={{ verticalAlign: 'middle', mr: 1 }}
                      />
                      {selectedProject.leader.phone || 'Not provided'}
                    </Typography>
                  </Stack>
                </Box>
              </Box>

              {/* تقدم المشروع */}
              {selectedProject.progress &&
                selectedProject.progress.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: 'bold' }}
                    >
                      Project Progress
                    </Typography>

                    <TableContainer
                      component={Paper}
                      sx={{ boxShadow: 'none' }}
                    >
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Report Date</TableCell>
                            <TableCell align="right">
                              Panels Installed
                            </TableCell>
                            <TableCell>Notes</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selectedProject.progress.map(
                            (progressItem, index) => (
                              <TableRow key={index}>
                                <TableCell>
                                  {new Date(
                                    progressItem.report_date
                                  ).toLocaleDateString()}
                                </TableCell>
                                <TableCell align="right">
                                  {progressItem.panels_installed.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                  {progressItem.notes || '-'}
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                )}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={handleCloseViewDialog}
            variant="text"
            sx={{ minWidth: 120 }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Table */}
      {loading ? (
        <CircularProgress size={20} color="primary" />
      ) : (
        <TableLeaderProjects
          projects={leaderProjects}
          viewProject={handleOpenViewDialog}
          addProgress={handleOpenAddProgressDialog}
        />
      )}
    </Box>
  )
}
