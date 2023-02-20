import { createSlice } from "@reduxjs/toolkit";
import AuthServices from '../../services/AuthServices';

const authSevice = new AuthServices();

const initialState = {
    isLoggedIn: false,
    email: null,
    //userName: null,
    //userId: null,
    accessToken: null,
    refreshToken: null,    
    tokenLifeTimeInMinutes:null,
    RememberMe:false,
    ReturnUrl: null
}

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
            state.tokenLifeTimeInMinutes = tokenLifeTimeInMinutes;
            state.RememberMe = RememberMe;
            state.ReturnUrl = ReturnUrl;
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
    }
});

export const {SET_ACTIVE_USER, REMOVE_ACTIVE_USER, REFRESH_ACCESS_TOKEN} = authSlice.actions

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectEmail = (state) => state.auth.email;

export const selectAccessToken = (state) => state.auth.accessToken;

export default authSlice.reducer