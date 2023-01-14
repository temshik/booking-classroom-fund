import React from "react";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  return (
      <Routes>
          <Route path={'/'} element={<HomePage/>} />
          <Route path={'/signin'} element={<SignIn/>} />
          <Route path={'/signup'} element={<SignUp/>} />
      </Routes>
  );
}

export default App;
