import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AuthServices from '../../services/AuthServices';
import axios from '../../utils/axios';
import Configuration from "../../configurations/Configuration";
import ErrorHandler from '../../modules/ErrorHandler';

const errorHandler = new ErrorHandler();


const initialState = {
    isLoading: false,
    isLoggedIn: false,
    isRoleLoading: false,
    status: null,
    errorMessage: null,
    email: null,
    role: null,
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
                window.localStorage.setItem('accessToken',data.accessToken);                                                                                             
            }             
            return data;  
        } catch (error) {
            errorHandler.httpErrorHandler(error);            
        }
    },
)

export const GetUserRoleByEmail = createAsyncThunk(
    'auth/GetUserRoleByEmail',
    async (email)=>{
        try{            
            const {data} = await axios.post(Configuration.GetUserRoleByEmail,{email})                        
            return data;  
        } catch (error) {
            errorHandler.httpErrorHandler(error);            
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_ACTIVE_USER: (state, action)=>{            
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
        },
        REFRESH_ACCESS_TOKEN:(state, action)=>{
            const authSevice = new AuthServices();
            const data = {refreshToken: window.localStorage.getItem('refreshToken')}
            authSevice.RefreshToken(data).then((data)=>{                                    
                console.log(JSON.stringify(data.data.accessToken)); 
                window.localStorage.setItem('accessToken',data.data.accessToken);
                console.log(JSON.stringify(data.data.refreshToken)); 
                window.localStorage.setItem('refreshToken',data.data.refreshToken);
                console.log(JSON.stringify(data.data.tokenLifeTimeInMinutes)); 
                window.localStorage.setItem('tokenLifeTimeInMinutes',data.data.tokenLifeTimeInMinutes);                
            }).catch((error)=>{
                console.log("Refresh",error);
            })
        }
    },
    extraReducers: {
        [GetUserRoleByEmail.pending]: (state) => {
            console.log('a')
            state.isRoleLoading = true            
            //state.status = null
            //state.errorMessage = null
        },
        [GetUserRoleByEmail.fulfilled]: (state, action) => {
            console.log('b')
            state.isRoleLoading = false            
            //state.status = action.payload.status
            //state.errorMessage = action.payload.errors
            state.role = action.payload
            console.log("categories",state.role)
        },
        [GetUserRoleByEmail.rejected]: (state, action) => {
            console.log('c')
            state.isRoleLoading = false            
            state.status = action.payload.status
            state.errorMessage = action.payload.errors            
        },
        //----------------------------------------
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

export const selectRole = (state) => state.auth.role;

export const selectAccessToken = (state) => state.auth.accessToken;

export default authSlice.reducer