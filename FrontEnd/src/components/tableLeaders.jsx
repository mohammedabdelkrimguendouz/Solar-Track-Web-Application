import {
  Add,
  Delete,
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

export default function TableLeaders({
  leaders,
  toggleStatus,
  deletedLeader,
  viewLeader,
  addLeader,
}) {
  const { isMobile } = useIsMobile()
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedLeader, setSelectedLeader] = useState(null)
  const open = Boolean(anchorEl)
  const [page, setPage] = useState(0)
  const rowsPerPage = 5

  const handleChangePage = (_, newPage) => setPage(newPage)

  // Get current leaders for the current page
  const paginatedLeaders = leaders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  const handleMenuOpen = (event, leader) => {
    setAnchorEl(event.currentTarget)
    setSelectedLeader(leader)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedLeader(null)
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
        <Typography variant="h5">Leaders Management</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          color="primary"
          onClick={() => addLeader()}
        >
          Add Leader
        </Button>
      </Box>

      {/* Leaders Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User Name</TableCell>
                {!isMobile && <TableCell>Email</TableCell>}
                <TableCell>Phone</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedLeaders.map((leader) => (
                <TableRow key={leader.id}>
                  <TableCell>{leader.username}</TableCell>
                  {!isMobile && <TableCell>{leader.email}</TableCell>}
                  <TableCell>{leader.phone}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={(e) => handleMenuOpen(e, leader)}
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
          count={leaders.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5]} // يمكنك إضافة خيارات أخرى إذا أردت
        />
      </Paper>

      {/* Menu should be outside the table */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem
          onClick={() => {
            viewLeader(selectedLeader)
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
            toggleStatus(selectedLeader)
            handleMenuClose()
          }}
        >
          <ListItemIcon>
            {selectedLeader?.is_active ? (
              <ToggleOn fontSize="small" color="success" />
            ) : (
              <ToggleOff fontSize="small" color="warning" />
            )}
          </ListItemIcon>
          <ListItemText>
            {selectedLeader?.is_active ? 'Deactivate' : 'Activate'}
          </ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            deletedLeader(selectedLeader)
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
