import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import AuthServices from './services/AuthServices';
import {REMOVE_ACTIVE_USER, SET_ACTIVE_USER, selectEmail}  from './redux/slice/authSlice';
import { useSelector } from 'react-redux';
import {Route, Routes} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import HomePage from "./pages/HomePage/HomePage";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword/UpdatePassword";
import Catalog from "./pages/Catalog/Catalog";
import Workspace from "./pages/Workspace/Workspace";
import CreateWorkspace from "./pages/Service/CreateWorkspace";
import UpdateWorkspace from "./pages/Service/UpdateWorkspace";
import Geolocation from "./modules/Geolocation/Geolocation";
import NotFound from "./pages/NotFound/NotFound";
import Booking from './pages/Booking/Booking';
import About from "./pages/About/About";
import {mapMarkers} from "./docs/data.ts";
import Geo from "./modules/Geolocation/Geo";

const authSevice = new AuthServices();

function App() {
    const dispatch = useDispatch()
    const stateEmail = useSelector(selectEmail)
    useEffect(()=>{
        if (window.localStorage.getItem('accessToken') !== null &&
            window.sessionStorage.getItem('email') !== null){
            const data = {
                email: window.sessionStorage.getItem('email')
            };
            authSevice.GetUserByEmail(data).then((data) =>{
                if(data.status === 200){
                    dispatch(SET_ACTIVE_USER({          
                        email: window.sessionStorage.getItem('email'),
                        accessToken: window.localStorage.getItem('accessToken'),
                        refreshToken: window.localStorage.getItem('refreshToken'),
                        tokenLifeTimeInMinutes: window.localStorage.getItem('tokenLifeTimeInMinutes'),
                        RememberMe: true,
                        ReturnUrl: "string"          
                      }));
                }                
            }).catch((error)=>{
                console.log(error);
                dispatch(REMOVE_ACTIVE_USER());
            })            
        }
        else if(window.localStorage.getItem('accessToken') !== null && stateEmail === null){
            dispatch(REMOVE_ACTIVE_USER());
        }
    },[])

  return (
    <>
      <Routes>
          <Route path={'/'} element={<HomePage/>} />
          <Route path={'/signin'} element={<SignIn/>} />
          <Route path={'/signup'} element={<SignUp/>} />
          <Route path={'/resetpassword'} element={<ResetPassword/>} />
          <Route path={'/updatepassword'} element={<UpdatePassword/>} />
          <Route path={'/catalog'} element={<Catalog/>}/>
          <Route path={'/catalog/:id'} element={<Workspace/>}/>
          <Route path={'/geolocation'} element={<Geolocation/>}/>
          <Route path='geo/*'>
              {mapMarkers.map(marker => {
                  return <Route key={marker.id} path={marker.text} element={<Geo mark={marker} />} />
              })}
          </Route>
          <Route path={'/booking'} element={<Booking/>}/>
          <Route path={'/createworkspace'} element={<CreateWorkspace/>}/>
          <Route path={'/updateworkspace'} element={<UpdateWorkspace/>}/>
          <Route path={'/about'} element={<About/>}/>
          <Route path="*" element={<NotFound/>} />
      </Routes>
      <ToastContainer />
      </>
  );
}

export default App;
