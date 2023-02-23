import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AuthServices from '../../services/AuthServices';
import axios from '../../utils/axios';
import Configuration from "../../configurations/Configuration";
import ErrorHandler from '../../modules/ErrorHandler';

const errorHandler = new ErrorHandler();


const initialState = {
    isLoading: false,
    isLoggedIn: false,
    status: null,
    errorMessage: null,
    email: null,
    //userName: null,
    //userId: null,
    // accessToken: null,
    // refreshToken: null,    
    // tokenLifeTimeInMinutes:null,
    RememberMe:false,
    ReturnUrl: null
}

export const CreateUser = createAsyncThunk(
    'auth/CreateUser',
    async ({FirstName,LastName,UserName,Email,Password,ConfirmedPassword,Role})=>{
        try{
            const {data} = await axios.post(Configuration.SignUp+"/"+Role, {
                FirstName,
                LastName,
                UserName,
                Email,
                Password,
                ConfirmedPassword,
            })    
            console.log(data);        
            return data;
        } catch (error) {
            errorHandler.httpErrorHandler(error);
        }
    },
)

export const Authorize = createAsyncThunk(
    'auth/Authorize',
    async ({Email,Password,RememberMe,ReturnUrl})=>{
        try{            
            const {data} = await axios.post(Configuration.SignIn, {
                Email,
                Password,
                RememberMe,
                ReturnUrl
            })
            if(data.accessToken)
            { 
                console.log(data.accessToken); 
                window.localStorage.setItem('accessToken',data.accessToken);
                console.log(data.refreshToken); 
                console.log(data.tokenLifeTimeInMinutes);                                                              
            } 
            console.log('data',data);
            return data;  
        } catch (error) {
            errorHandler.httpErrorHandler(error);            
        }
    },
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_ACTIVE_USER: (state, action)=>{
            console.log("SET_ACTIVE_USER",action.payload);
            const {email,
                accessToken,
                refreshToken,
                tokenLifeTimeInMinutes,
                RememberMe,
                ReturnUrl} = action.payload;
            state.isLoggedIn = true;
            window.localStorage.setItem('accessToken',accessToken);
            window.localStorage.setItem('refreshToken',refreshToken);   
            window.localStorage.setItem('tokenLifeTimeInMinutes',tokenLifeTimeInMinutes);
            state.RememberMe = RememberMe;
            state.ReturnUrl = ReturnUrl;
            if(RememberMe)
            {
                window.sessionStorage.setItem('email',email);                                             
            }
            else
            {
                state.email = email;
            }            
            console.log("SET_ACTIVE_USER isLoggedIn",state.isLoggedIn);
        },
        REMOVE_ACTIVE_USER:(state, action)=>{            
            state.isLoggedIn = false;
            state.email = null;
            // state.accessToken = null;
            // state.refreshToken = null;
            // state.tokenLifeTimeInMinutes = null;
            state.RememberMe = false;
            state.ReturnUrl = null;
            window.localStorage.removeItem('accessToken');
            window.sessionStorage.removeItem('email');
            window.localStorage.removeItem('refreshToken');
            window.localStorage.removeItem('tokenLifeTimeInMinutes');
            console.log('REMOVE_ACTIVE_USER isLoggedIn =',state.isLoggedIn);
        },
        REFRESH_ACCESS_TOKEN:(state, action)=>{
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
            })
        }
    },
    extraReducers: {
        //запрос отправляется
        [Authorize.pending]: (state) => {
            state.isLoading = true
            state.isLoggedIn = false
            state.status = null
            state.errorMessage = null
        },
        //запрос выполнился
        [Authorize.fulfilled]: (state, action) => {
            state.isLoading = false
            state.isLoggedIn = true
            //переделоть на бэке для вывода ошибок
            //state.status = action.payload.status
            //state.errorMessage = action.payload.errors  
            //console.log('state.errorMessage',state.errorMessage);  
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
            state.tokenLifeTimeInMinutes = action.payload.tokenLifeTimeInMinutes
        },
        //запрос вернул ошибку
        [Authorize.rejected]: (state, action) => {
            state.isLoading = false
            state.isLoggedIn = false
            //переделоть на бэке для вывода ошибок
            state.status = action.payload.status  
            state.errorMessage = action.payload.errors              
        },        
    }
    
});

export const {SET_ACTIVE_USER, REMOVE_ACTIVE_USER, REFRESH_ACCESS_TOKEN} = authSlice.actions

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectEmail = (state) => state.auth.email;

export const selectAccessToken = (state) => state.auth.accessToken;

export default authSlice.reducer