import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  addProject as addProjectApi,
  deleteProject as deleteProjectApi,
  getProjects,
  updateProject as updateProjectApi,
} from '../../services/projectApi'

export const fetchProjects = createAsyncThunk(
  'projectsApi/fetchProjects',
  async () => {
    const data = await getProjects()
    if (data) return data
    return []
  }
)

export const addProject = createAsyncThunk(
  'projectsApi/addProject',
  async (project) => {
    const data = await addProjectApi(project)
    if (data) return data
    return null
  }
)

export const deleteProject = createAsyncThunk(
  'projectsApi/deleteProject',
  async (projectId) => {
    const isDeleted = await deleteProjectApi(projectId)

    if (isDeleted) return projectId
    return null
  }
)

export const updateProject = createAsyncThunk(
  'projectsApi/updateProject',
  async ({ projectId, project }) => {
    const data = await updateProjectApi(projectId, project)
    if (data) return data
    return null
  }
)
const initialState = {
  projects: [],
  isAddingEditProject: false,
  isDeletingProject: false,
  isLoading: false,
  error: null,
}

export const projectsApiSlice = createSlice({
  name: 'projectsApi',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isLoading = false
        state.projects = action.payload
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(addProject.pending, (state) => {
        state.isAddingEditProject = true
        state.error = null
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.isAddingEditProject = false
        if (action.payload) {
          state.projects.push(action.payload)
        }
      })
      .addCase(addProject.rejected, (state, action) => {
        state.isAddingEditProject = false
        state.error = action.error.message
      })
      .addCase(deleteProject.pending, (state) => {
        state.isDeletingProject = true
        state.error = null
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isDeletingProject = false
        if (action.payload) {
          state.projects = state.projects.filter(
            (leader) => leader.id !== action.payload
          )
        }
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isDeletingProject = false
        state.error = action.error.message
      })

      .addCase(updateProject.pending, (state) => {
        state.isAddingEditProject = true
        state.error = null
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.isAddingEditProject = false
        if (action.payload) {
          state.projects = state.projects.map((project) =>
            project.id === action.payload.id
              ? { ...project, ...action.payload }
              : project
          )
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.isAddingEditProject = false
        state.error = action.error.message
      })
  },
})

export default projectsApiSlice.reducer
