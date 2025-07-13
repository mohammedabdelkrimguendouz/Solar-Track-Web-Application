import axiosInstanceWithTokenAuth from './axiosInstanceWithTokenAuth'

export const getUserInfo = async () => {
  try {
    const res = await axiosInstanceWithTokenAuth.get('users/me/')

    if (!res.data) {
      console.warn('Unexpected API response structure')
      return null
    }

    return res.data
  } catch {
    return null
  }
}

export const updateUserInfo = async (formData) => {
  try {
    const res = await axiosInstanceWithTokenAuth.put('/users/me/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    if (!res.data) {
      console.warn('Unexpected API response structure')
      return null
    }

    return res.data
  } catch {
    return null
  }
}

export const changePassword = async (data) => {
  try {
    const res = await axiosInstanceWithTokenAuth.post(
      '/users/change-password/',
      data
    )
    return res.data
  } catch (err) {
    console.error('Failed to change password', err)
    return null
  }
}
