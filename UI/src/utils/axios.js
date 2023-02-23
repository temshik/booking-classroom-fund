import axios from 'axios'
import {useDispatch} from 'react-redux';
import {REFRESH_ACCESS_TOKEN} from '../redux/slice/authSlice'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:5000'
})

const Refresh=()=>{
    const dispatch = useDispatch();    
    dispatch(REFRESH_ACCESS_TOKEN());
}

instance.interceptors.request.use((config)=>{
    //config.headers.Autorization = "Bearer "+window.localStorage.getItem('accessToken')
    return {...config, headers: { ...config.headers, Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`}};
   },    
)

instance.interceptors.response.use((response)=>{
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    if (error.response) {
        if (error.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;   
            console.log("запрос на ревреш токе до:",window.localStorage.getItem('accessToken'))
            Refresh();
            console.log("запрос на ревреш токе после:",window.localStorage.getItem('accessToken'))
            // Do something, call refreshToken() request for example;
            // return a request
            return instance(originalConfig);
        }

        return Promise.reject(error);
    }
})

export default instance