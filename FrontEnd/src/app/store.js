import { configureStore } from '@reduxjs/toolkit'
import leadersReducer from '../features/leaders/leadersApiSlice'
import projectsReducer from '../features/projects/projectsApiSlice'

export const store = configureStore({
  reducer: {
    leaders: leadersReducer,
    projects: projectsReducer,
  },
})
