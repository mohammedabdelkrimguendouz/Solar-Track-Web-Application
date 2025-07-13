import axios from 'axios'

let currentToken = null

export const setAuthToken = (token) => {
  currentToken = token
}

const axiosInstanceWithTokenAuth = axios.create({
  baseURL: 'http://192.168.1.5:8000/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

axiosInstanceWithTokenAuth.interceptors.request.use((config) => {
  if (currentToken) {
    config.headers.Authorization = `Bearer ${currentToken}`
  }
  return config
})

axiosInstanceWithTokenAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.message
    console.error('API Error:', errorMessage)
    return Promise.reject(new Error(errorMessage))
  }
)

export default axiosInstanceWithTokenAuth
