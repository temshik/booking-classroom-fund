import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:5000'
})

instance.interceptors.request.use((config)=>{
    //config.headers.Autorization = "Bearer "+window.localStorage.getItem('accessToken')

    return {...config, headers: { ...config.headers, Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`}};
}
)

export default instance