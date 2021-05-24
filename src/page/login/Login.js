import React from 'react'

import LoginForm from '../../components/login-form/LoginForm'

import './Login.scss'

const Login = ({ setLoggedIn, loggedIn }) => {
  return (
    <div className="login-wrapper">
      <h2 className="h2">Welcome! Please Login</h2>
      <LoginForm setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
    </div>
  )
}

export default Login
