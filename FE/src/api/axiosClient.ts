import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
})

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosClient.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status
    if (status === 401) {
      // Token invalid/expired → logout and redirect to signin
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      if (location.pathname !== '/signin') {
        location.href = '/signin'
      }
    }
    return Promise.reject(error)
  }
)

export default axiosClient