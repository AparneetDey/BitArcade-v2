import React from 'react'
import { Navigate } from 'react-router'
import Spinner from './Spinner.jsx'

const ProtectedRoute = ({ isSignedIn, isLoading, children, page}) => {
  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  // Redirect to login if not signed in and trying to access profile
  if(!isSignedIn && page==='profile'){
    return (<Navigate to={'/authentication/login'} />)
  }
  
  // Redirect to home if signed in and trying to access auth
  if(isSignedIn && page==='auth'){
    return (<Navigate to={'/'} />)
  }
  
  return children;
}

export default ProtectedRoute