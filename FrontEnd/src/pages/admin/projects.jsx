import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  Paper,
  Select,
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
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import MenuItem from '@mui/material/MenuItem'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TableProjects from '../../components/tableProjects'
import { useIsMobile } from '../../contexts/isMobileContext'
import { useToast } from '../../contexts/toastContext'
import { fetchLeaders as fetchLeadersApi } from '../../features/leaders/leadersApiSlice'
import {
  addProject,
  deleteProject,
  fetchProjects,
  updateProject,
} from '../../features/projects/projectsApiSlice'

export default function Projects() {
  const [mode, setMode] = useState('add')
  const { showHideAlert } = useToast()
  const dispatch = useDispatch()
  const { projects, isLoading, error, isAddingEditProject, isDeletingProject } =
    useSelector((state) => state.projects)

  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showAddEditDialog, setShowAddEditDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [project, setProject] = useState(null)
  const { leaders } = useSelector((state) => state.leaders)
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    start_date: dayjs(),
    end_date: dayjs(),
    number_of_panels: 0,
    leader_id: '',
    status: false,
  })

  const { isMobile } = useIsMobile()

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  const fetchLeaders = async () => {
    await dispatch(fetchLeadersApi()).unwrap()
  }

  useEffect(() => {
    if (error) {
      showHideAlert(error, false)
    }
  }, [error, showHideAlert])

  const handleDeleteProject = async () => {
    try {
      await dispatch(deleteProject(project.id)).unwrap()

      showHideAlert('Project deleted successfully', true)
      handleCloseDeleteDialog()
    } catch {
      showHideAlert('Failed to delete project', false)
    }
    handleCloseDeleteDialog()
  }

  const validateProjectForm = () => {
    if (projectForm.start_date > projectForm.end_date) {
      showHideAlert('Start date must be before end date', false)
      return false
    }
    if (projectForm.number_of_panels < 1) {
      showHideAlert('Number of panels must be at least 1', false)
      return false
    }
    if (projectForm.leader_id === '') {
      showHideAlert('Leader is required', false)
      return false
    }

    return true
  }

  const handleAddProject = async () => {
    if (!validateProjectForm()) return
    const formattedProjectForm = {
      ...projectForm,
      start_date: projectForm.start_date.format('YYYY-MM-DD'),
      end_date: projectForm.end_date.format('YYYY-MM-DD'),
      leader_id: Number(projectForm.leader_id),
    }

    try {
      const result = await dispatch(addProject(formattedProjectForm)).unwrap()
      if (result) {
        showHideAlert('Project added successfully', true)
      }
    } catch {
      showHideAlert('Failed to add project', false)
    }

    handleCloseAddEditDialog()
  }

  const handleCloseViewDialog = () => setShowViewDialog(false)
  const handleCloseAddEditDialog = () => {
    setShowAddEditDialog(false)
    setProjectForm({
      name: '',
      description: '',
      start_date: dayjs(),
      end_date: dayjs(),
      number_of_panels: 0,
      leader_id: '',
      status: false,
    })
  }
  const handleCloseDeleteDialog = () => setShowDeleteDialog(false)

  const handleOpenAddDialog = async (selectedProject) => {
    setProject(selectedProject)
    setShowAddEditDialog(true)
    await fetchLeaders()
    setMode('add')
  }

  const handleOpenEditDialog = async (selectedProject) => {
    setProject(selectedProject)
    setShowAddEditDialog(true)
    await fetchLeaders()

    setProjectForm({
      name: selectedProject.name,
      description: selectedProject.description,
      start_date: selectedProject.start_date,
      end_date: selectedProject.end_date,
      number_of_panels: selectedProject.number_of_panels,
      leader_id: selectedProject.leader.id,
      status: selectedProject.status,
    })
    setMode('edit')
  }

  const handleOpenViewDialog = (selectedProject) => {
    setProject(selectedProject)
    setShowViewDialog(true)
  }

  const handleOpenDeleteDialog = (selectedProject) => {
    setProject(selectedProject)
    setShowDeleteDialog(true)
  }

  const handleUpdateProject = async () => {
    if (!validateProjectForm()) return
    try {
      await dispatch(
        updateProject({ projectId: project.id, project: projectForm })
      ).unwrap()
      showHideAlert('Project updated successfully', true)
    } catch {
      showHideAlert('Failed to update project', false)
    }

    handleCloseAddEditDialog()
  }

  const handleToggleStatusProject = async (selectedProject) => {
    const formattedProjectForm = {
      name: selectedProject.name,
      description: selectedProject.description,
      start_date: selectedProject.start_date,
      end_date: selectedProject.end_date,
      number_of_panels: selectedProject.number_of_panels,
      leader_id: selectedProject.leader.id,
      status: !selectedProject.status,
    }
    try {
      await dispatch(
        updateProject({
          projectId: selectedProject.id,
          project: formattedProjectForm,
        })
      ).unwrap()

      showHideAlert('Project status updated successfully', true)
    } catch {
      showHideAlert('Failed to update project status', false)
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
            Are you sure you want to delete this project?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>No</Button>
          <Button
            onClick={handleDeleteProject}
            autoFocus
            disabled={isDeletingProject}
          >
            {isDeletingProject ? (
              <CircularProgress size={20} color="primary" />
            ) : (
              'Yes'
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add/Edit Dialog */}
      <Dialog
        open={showAddEditDialog}
        onClose={handleCloseAddEditDialog}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault()
              if (mode === 'add') {
                handleAddProject()
              } else {
                handleUpdateProject()
              }
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
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="filled"
            value={projectForm.name}
            onChange={(event) => {
              setProjectForm({ ...projectForm, name: event.target.value })
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            required
            fullWidth
            variant="filled"
            multiline
            rows={3}
            value={projectForm.description}
            onChange={(event) => {
              setProjectForm({
                ...projectForm,
                description: event.target.value,
              })
            }}
          />
          <Box sx={{ display: 'flex', gap: 2, mb: 2, mt: 2 }}>
            <DatePicker
              label="Start Date"
              required
              value={
                projectForm.start_date ? dayjs(projectForm.start_date) : null
              }
              onChange={(newValue) =>
                setProjectForm((prev) => ({
                  ...prev,
                  start_date: newValue ? newValue.format('YYYY-MM-DD') : null,
                }))
              }
              slotProps={{
                textField: {
                  fullWidth: true,
                },
              }}
            />
            <DatePicker
              label="End Date"
              required
              value={projectForm.end_date ? dayjs(projectForm.end_date) : null}
              onChange={(newValue) =>
                setProjectForm((prev) => ({
                  ...prev,
                  end_date: newValue ? newValue.format('YYYY-MM-DD') : null,
                }))
              }
              slotProps={{
                textField: {
                  fullWidth: true,
                },
              }}
            />
          </Box>

          <TextField
            margin="dense"
            required
            id="number_of_panels"
            name="number_of_panels"
            label="Number of Panels"
            type="number"
            fullWidth
            value={projectForm.number_of_panels}
            onChange={(event) => {
              setProjectForm({
                ...projectForm,
                number_of_panels: event.target.value,
              })
            }}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth required>
            <InputLabel id="leader-select-label">Project Leader</InputLabel>
            <Select
              labelId="leader-select-label"
              id="leader_id"
              name="leader_id"
              value={projectForm.leader_id}
              label="Project Leader"
              onChange={(event) => {
                setProjectForm({
                  ...projectForm,
                  leader_id: event.target.value,
                })
              }}
            >
              <MenuItem value="">Select Leader</MenuItem>
              {leaders.map((leader) => (
                <MenuItem key={leader.id} value={leader.id}>
                  {leader.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddEditDialog}>Cancel</Button>
          <Button type="submit" disabled={isAddingEditProject}>
            {isAddingEditProject ? (
              <CircularProgress size={20} color="primary" />
            ) : mode === 'add' ? (
              'Add'
            ) : (
              'Update'
            )}
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
          {project && (
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
                      <Typography>{project.name}</Typography>
                    </Box>

                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Description
                      </Typography>
                      <Typography>{project.description}</Typography>
                    </Box>

                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Status
                      </Typography>
                      <Chip
                        label={project.status ? 'Completed' : 'In Progress'}
                        color={project.status ? 'success' : 'error'}
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
                        {new Date(project.start_date).toLocaleDateString()}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        End Date
                      </Typography>
                      <Typography>
                        {new Date(project.end_date).toLocaleDateString()}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Number of Panels
                      </Typography>
                      <Typography>
                        {project.number_of_panels.toLocaleString()}
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
                    src={project.leader.photo || '/default-avatar.png'}
                    sx={{ width: 72, height: 72 }}
                  />

                  <Stack spacing={1}>
                    <Typography variant="subtitle1">
                      {project.leader.first_name} {project.leader.last_name}
                    </Typography>

                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {project.leader.user_type} •
                        <Box
                          component="span"
                          color={
                            project.leader.is_active
                              ? 'success.main'
                              : 'error.main'
                          }
                          sx={{ ml: 1 }}
                        >
                          {project.leader.is_active ? 'Active' : 'Inactive'}
                        </Box>
                      </Typography>
                    </Box>

                    <Typography variant="body2">
                      <EmailIcon
                        fontSize="small"
                        sx={{ verticalAlign: 'middle', mr: 1 }}
                      />
                      {project.leader.email}
                    </Typography>

                    <Typography variant="body2">
                      <PhoneIcon
                        fontSize="small"
                        sx={{ verticalAlign: 'middle', mr: 1 }}
                      />
                      {project.leader.phone || 'Not provided'}
                    </Typography>
                  </Stack>
                </Box>
              </Box>

              {/* تقدم المشروع */}
              {project.progress && project.progress.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 'bold' }}
                  >
                    Project Progress
                  </Typography>

                  <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Report Date</TableCell>
                          <TableCell align="right">Panels Installed</TableCell>
                          <TableCell>Notes</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {project.progress.map((progressItem, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              {new Date(
                                progressItem.report_date
                              ).toLocaleDateString()}
                            </TableCell>
                            <TableCell align="right">
                              {progressItem.panels_installed.toLocaleString()}
                            </TableCell>
                            <TableCell>{progressItem.notes || '-'}</TableCell>
                          </TableRow>
                        ))}
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
      {isLoading ? (
        <CircularProgress size={20} color="primary" />
      ) : (
        <TableProjects
          projects={projects}
          updateProject={handleOpenEditDialog}
          deletedProject={handleOpenDeleteDialog}
          viewProject={handleOpenViewDialog}
          addProject={handleOpenAddDialog}
          toggleStatusProject={handleToggleStatusProject}
        />
      )}
    </Box>
  )
}
