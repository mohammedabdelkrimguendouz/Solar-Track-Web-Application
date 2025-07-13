import { Visibility, Add } from '@mui/icons-material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {
  Box,
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

export default function TableLeaderProjects({
  projects,
  viewProject,
  addProgress,
}) {
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
        <Typography variant="h5">My Projects Progress</Typography>
      </Box>

      {/* Leaders Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Installed</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.start_date}</TableCell>
                  <TableCell>
                    {project.status ? 'Completed' : 'In Progress'}
                  </TableCell>
                  <TableCell>
                    {project.progress.reduce(
                      (acc, curr) => acc + curr.panels_installed,
                      0
                    )}
                  </TableCell>
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
          disabled={selectedProject?.status}
          onClick={() => {
            addProgress(selectedProject)
            handleMenuClose()
          }}
        >
          <ListItemIcon>
            <Add fontSize="small" color="green" />
          </ListItemIcon>
          <ListItemText>Add Progress</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}
