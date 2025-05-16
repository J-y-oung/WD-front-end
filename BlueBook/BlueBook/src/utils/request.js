import axios from 'axios'

const service = axios.create({
    baseURL: '/api', // 接口基础地址
    timeout: 10000, // 超时时间
    headers: { 'Content-Type': 'application/json' }
})

// 请求拦截器（添加 token）
service.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// 响应拦截器（处理通用错误）
service.interceptors.response.use(
    response => response.data, // 直接返回核心数据
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    router.push('/login')
                    break
                case 403:
                    alert('权限不足')
                    break
                default:
                    console.error('请求错误:', error)
            }
        }
        return Promise.reject(error)
    }
)

export default service