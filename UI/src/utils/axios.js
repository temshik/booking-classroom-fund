import axios from 'axios'
import {useDispatch} from 'react-redux';
import {REFRESH_ACCESS_TOKEN, REMOVE_ACTIVE_USER} from '../redux/slice/authSlice'
import AuthServices from '../services/AuthServices';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:5000'
})

const Refresh=()=>{
    // const dispatch = useDispatch();    
    // dispatch(REFRESH_ACCESS_TOKEN());
    const authSevice = new AuthServices();
    const data = {refreshToken: window.localStorage.getItem('refreshToken')}
    authSevice.RefreshToken(data).then((data)=>{
        console.log(data.data);  
        //if(data.status === 200)
        {                     
            console.log(JSON.stringify(data.data.accessToken)); 
            window.localStorage.setItem('accessToken',data.data.accessToken);
            console.log(JSON.stringify(data.data.refreshToken)); 
            window.localStorage.setItem('refreshToken',data.data.refreshToken);
            console.log(JSON.stringify(data.data.tokenLifeTimeInMinutes)); 
            window.localStorage.setItem('tokenLifeTimeInMinutes',data.data.tokenLifeTimeInMinutes);
        }
    }).catch((error)=>{
        console.log("Refresh",error);
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
            console.log("запрос на ревреш токе до:",window.localStorage.getItem('accessToken'))
            Refresh();
            console.log("запрос на ревреш токе после:",window.localStorage.getItem('accessToken'))
            // Do something, call refreshToken() request for example;
            // return a request
            window.location.reload();
            return instance(originalConfig);
        }        
        return Promise.reject(error);
    }
})

export default instance