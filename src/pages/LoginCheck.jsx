import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAccessToken } from '../utils/APIRoutes';

const LoginCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkClientCode();
  }, [])

  const checkClientCode = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const code = queryParameters.get("code");
    if(code === null || code === ""){
      navigate('/login');
      return;
    }

    const check = fetchAccessToken(code)

    if(check === 'error'){
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      navigate('/login');
      return;
    }

    navigate('/')
  }

  return (
    <div>
      <div>
        Checking account...
      </div>

    </div>
  )
}

export default LoginCheck