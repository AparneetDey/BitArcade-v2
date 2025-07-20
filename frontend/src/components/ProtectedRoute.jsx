import React from 'react'
import { Navigate } from 'react-router'

const ProtectedRoute = ({ isSignedIn, children, page}) => {
  if(!isSignedIn && page==='profile'){
    return (<Navigate to={'/authentication/login'} />)
  }
  if(isSignedIn && page==='auth'){
    return (<Navigate to={'/'} />)
  }
  return children;
}

export default ProtectedRoute