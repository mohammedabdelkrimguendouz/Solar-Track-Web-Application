import {
  Add,
  Delete,
  Edit,
  ToggleOff,
  ToggleOn,
  Visibility,
} from '@mui/icons-material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {
  Box,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useIsMobile } from '../contexts/isMobileContext'

export default function TableProjects({
  projects,
  updateProject,
  deletedProject,
  viewProject,
  toggleStatusProject,
  addProject,
}) {
  const { isMobile } = useIsMobile()
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const open = Boolean(anchorEl)
  const [page, setPage] = useState(0)
  const rowsPerPage = 5

  const handleChangePage = (_, newPage) => setPage(newPage)

  // Get current leaders for the current page
  const paginatedProjects = projects.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  const handleMenuOpen = (event, project) => {
    setAnchorEl(event.currentTarget)
    setSelectedProject(project)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedProject(null)
  }

  return (
    <>
      {/* Leaders Table Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Projects Management</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          color="primary"
          onClick={() => addProject()}
        >
          Add Project
        </Button>
      </Box>

      {/* Leaders Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Start Date</TableCell>
                {!isMobile && <TableCell>Number of Panels</TableCell>}
                {!isMobile && <TableCell>Leader Name</TableCell>}
                {!isMobile && <TableCell>Number Of Updates Progress</TableCell>}
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.start_date}</TableCell>
                  {!isMobile && (
                    <TableCell>{project.number_of_panels}</TableCell>
                  )}
                  {!isMobile && (
                    <TableCell>
                      {project.leader.first_name} {project.leader.last_name}
                    </TableCell>
                  )}
                  {!isMobile && (
                    <TableCell>{project.progress.length}</TableCell>
                  )}
                  <TableCell align="right">
                    <IconButton
                      onClick={(e) => handleMenuOpen(e, project)}
                      color="primary"
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={projects.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5]}
        />
      </Paper>

      {/* Menu should be outside the table */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem
          onClick={() => {
            viewProject(selectedProject)
            handleMenuClose()
          }}
        >
          <ListItemIcon>
            <Visibility fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText>View</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            updateProject(selectedProject)
            handleMenuClose()
          }}
        >
          <ListItemIcon>
            <Edit fontSize="small" color="green" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            toggleStatusProject(selectedProject)
            handleMenuClose()
          }}
        >
          <ListItemIcon>
            {selectedProject?.status ? (
              <ToggleOn fontSize="small" color="success" />
            ) : (
              <ToggleOff fontSize="small" color="warning" />
            )}
          </ListItemIcon>
          <ListItemText>
            {selectedProject?.status ? 'Incomplete' : 'Complete'}
          </ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            deletedProject(selectedProject)
            handleMenuClose()
          }}
        >
          <ListItemIcon>
            <Delete fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}
