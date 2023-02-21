import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AuthServices from '../../services/AuthServices';
import axios from '../../utils/axios';
import Configuration from "../../configurations/Configuration";
import ErrorHandler from '../../modules/ErrorHandler';

const errorHandler = new ErrorHandler();
const authSevice = new AuthServices();

const initialState = {
    isLoggedIn: false,
    status: null,
    email: null,
    //userName: null,
    //userId: null,
    accessToken: null,
    refreshToken: null,    
    tokenLifeTimeInMinutes:null,
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
            console.log(data);
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
            state.email = email;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.tokenLifeTimeInMinutes = tokenLifeTimeInMinutes
            state.RememberMe = RememberMe;
            state.ReturnUrl = ReturnUrl;
            if(RememberMe)
            {
                window.localStorage.setItem('email',email);
                window.localStorage.setItem('tokenLifeTimeInMinutes',tokenLifeTimeInMinutes);
                window.localStorage.setItem('refreshToken',refreshToken);                
            }
            window.localStorage.setItem('accessToken',accessToken);
            console.log("SET_ACTIVE_USER isLoggedIn",state.isLoggedIn);
        },
        REMOVE_ACTIVE_USER:(state, action)=>{            
            state.isLoggedIn = false;
            state.email = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.tokenLifeTimeInMinutes = null;
            state.RememberMe = false;
            state.ReturnUrl = null;
            window.localStorage.removeItem('accessToken');
            window.localStorage.removeItem('email');
            window.localStorage.removeItem('refreshToken');
            window.localStorage.removeItem('tokenLifeTimeInMinutes');
            console.log('REMOVE_ACTIVE_USER isLoggedIn =',state.isLoggedIn);
        },
        REFRESH_ACCESS_TOKEN:(state, action)=>{
            const data = {refreshToken: state.refreshToken}
            authSevice.RefreshToken(data).then((data)=>{
                console.log(data.data);  
                if(data.status === 200)
                { 
                  console.log(JSON.stringify(data.data.accessToken)); 
                  state.accessToken = data.data.accessToken;
                  console.log(JSON.stringify(data.data.refreshToken)); 
                  state.refreshToken = data.data.refreshToken;
                  console.log(JSON.stringify(data.data.tokenLifeTimeInMinutes)); 
                  state.tokenLifeTimeInMinutes = data.data.tokenLifeTimeInMinutes;
                }
            }).catch((error)=>{
                console.log(error);
            })
        }
    },
    extraReducers: {
        //запрос отправляется
        [Authorize.pending]: (state) => {
            state.isLoggedIn = false
            state.status = null
        },
        //запрос выполнился
        [Authorize.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            //переделоть на бэке для вывода ошибок
            //state.status = action.payload.errors
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
            state.tokenLifeTimeInMinutes = action.payload.tokenLifeTimeInMinutes
        },
        //запрос вернул ошибку
        [Authorize.rejected]: (state, action) => {
            state.isLoggedIn = false
            //переделоть на бэке для вывода ошибок
            //state.status = action.payload.errors           
        },        
    }
    
});

export const {SET_ACTIVE_USER, REMOVE_ACTIVE_USER, REFRESH_ACCESS_TOKEN} = authSlice.actions

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectEmail = (state) => state.auth.email;

export const selectAccessToken = (state) => state.auth.accessToken;

export default authSlice.reducer