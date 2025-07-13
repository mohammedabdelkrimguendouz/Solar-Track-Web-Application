import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.5:8000/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.response.use(
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

export default axiosInstance
