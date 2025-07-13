import axiosInstanceWithTokenAuth from './axiosInstanceWithTokenAuth'

export const getLeaders = async () => {
  try {
    const res = await axiosInstanceWithTokenAuth.get('users/leader-users/')

    if (!res.data) {
      console.warn('Unexpected API response structure')
      return null
    }

    return res.data
  } catch {
    return null
  }
}
export const addLeader = async (leader) => {
  try {
    const res = await axiosInstanceWithTokenAuth.post('users/register/', leader)

    if (!res.data) {
      console.warn('Unexpected API response structure')
      return null
    }

    return res.data
  } catch {
    return null
  }
}

export const deleteLeader = async (leaderId) => {
  try {
    await axiosInstanceWithTokenAuth.delete(`users/leader-users/${leaderId}/`)

    return true
  } catch {
    return false
  }
}

export const toggleLeaderStatus = async (leaderId) => {
  try {
    const res = await axiosInstanceWithTokenAuth.patch(
      `users/leader-users/${leaderId}/toggle_active/`
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
