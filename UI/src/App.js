import React from "react";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Catalog from "./pages/Catalog/Catalog";
import Workspace from "./pages/Workspace/Workspace";
import Geolocation from "./modules/Geolocation/Geolocation";
import NotFound from "./pages/NotFound/NotFound";
import About from "./pages/About/About";
import {mapMarkers} from "./docs/data.ts";
import Geo from "./modules/Geolocation/Geo";

function App() {
  return (
      <Routes>
          <Route path={'/'} element={<HomePage/>} />
          <Route path={'/signin'} element={<SignIn/>} />
          <Route path={'/signup'} element={<SignUp/>} />
          <Route path={'/resetpassword'} element={<ResetPassword/>} />
          <Route path={'/catalog'} element={<Catalog/>}/>
          <Route path={'/catalog/:id'} element={<Workspace/>}/>
          <Route path={'/geolocation'} element={<Geolocation/>}/>
          <Route path='geo/*'>
              {mapMarkers.map(marker => {
                  return <Route key={marker.id} path={marker.text} element={<Geo mark={marker} />} />
              })}
          </Route>
          <Route path={'/about'} element={<About/>}/>
          <Route path="*" element={<NotFound/>} />
      </Routes>
  );
}

export default App;
