import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ children,ischeckToken, isLoggedIn, ...props }) => {
  // const isRenderSpinner = ischeckToken // true
  return(localStorage.getItem("token")?
    <Route {...props}>
    {  children }
  </Route> 
    :<Redirect to={"/signin"} />
)}

export default ProtectedRoute; 