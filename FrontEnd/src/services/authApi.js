import axiosInstance from './axiosInstance'

export const login = async (username, password) => {
  try {
    const res = await axiosInstance.post('users/login/', {
      username,
      password,
    })

    if (!res.data) {
      console.warn('Unexpected API response structure')
      return null
    }

    return res.data
  } catch (error) {
    throw new Error(error)
  }
}

export const getAccessToken = async (refresh) => {
  try {
    const res = await axiosInstance.post('users/token/refresh/', { refresh })

    if (!res.data) {
      console.warn('Unexpected API response structure')
      return null
    }

    return res.data
  } catch {
    return null
  }
}
