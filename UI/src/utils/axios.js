import axios from 'axios'
import {REMOVE_ACTIVE_USER} from '../redux/slice/authSlice'
import AuthServices from '../services/AuthServices';

const instance = axios.create({
    baseURL: 'http://localhost:5000'
})

const Refresh=()=>{
    const authSevice = new AuthServices();
    const data = {refreshToken: window.localStorage.getItem('refreshToken')}
    authSevice.RefreshToken(data).then((data)=>{                                                      
        window.localStorage.setItem('accessToken',data.data.accessToken);             
        window.localStorage.setItem('refreshToken',data.data.refreshToken);            
        window.localStorage.setItem('tokenLifeTimeInMinutes',data.data.tokenLifeTimeInMinutes);        
    }).catch((error)=>{        
        REMOVE_ACTIVE_USER();
    })    
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
            Refresh();            
            // Do something, call refreshToken() request for example;
            // return a request
            window.location.reload();
            return instance(originalConfig);
        }        
        return Promise.reject(error);
    }
})

export default instance