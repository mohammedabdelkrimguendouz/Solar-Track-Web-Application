import axiosInstanceWithTokenAuth from './axiosInstanceWithTokenAuth'

export const getProjects = async () => {
  try {
    const res = await axiosInstanceWithTokenAuth.get('/projects/projects/')
    if (!res.data) {
      console.warn('Unexpected API response structure')
      return null
    }

    return res.data
  } catch {
    return null
  }
}

export const getDashboardStatistics = async () => {
  try {
    const res = await axiosInstanceWithTokenAuth.get(
      '/projects/dashboard-statistics/'
    )
    if (!res.data) {
      console.warn('Unexpected API response structure')
      return null
    }

    return res.data
  } catch {
    return null
  }
}

export const getProject = async (id) => {
  try {
    const res = await axiosInstanceWithTokenAuth.get(
      `/projects/projects/${id}/`
    )

    if (!res.data) {
      console.warn('Unexpected API response structure')
      return null
    }

    return res.data
  } catch {
    return null
  }
}

export const deleteProject = async (id) => {
  try {
    await axiosInstanceWithTokenAuth.delete(`/projects/projects/${id}/`)
    return true
  } catch (err) {
    console.error('Delete failed:', err)
    return false
  }
}

export const addProject = async (project) => {
  try {
    const res = await axiosInstanceWithTokenAuth.post(
      '/projects/projects/',
      project
    )
    if (!res.data) {
      console.warn('Unexpected API response structure')
      return null
    }
    return res.data
  } catch {
    return null
  }
}

export const updateProject = async (id, project) => {
  try {
    const res = await axiosInstanceWithTokenAuth.put(
      `/projects/projects/${id}/`,
      project
    )
    if (!res.data) {
      console.warn('Unexpected API response structure')
      return null
    }
    return res.data
  } catch {
    return null
  }
}

export const getLeaderProjects = async () => {
  try {
    const res = await axiosInstanceWithTokenAuth.get(
      '/projects/get-projects-by-user/'
    )
    if (!res.data) {
      console.warn('Unexpected API response structure')
      return null
    }

    return res.data
  } catch {
    return null
  }
}

export const addProgress = async (progressData) => {
  try {
    const response = await axiosInstanceWithTokenAuth.post(
      '/progress/add-progress/',
      progressData
    )
    return response.data
  } catch (error) {
    console.error('Error adding progress:', error)
    throw error
  }
}
