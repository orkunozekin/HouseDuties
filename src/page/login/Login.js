import React from 'react'

import LoginForm from '../../components/login-form/LoginForm'

import './Login.scss'

const Login = () => {
  return (
    <div className="login-wrapper">
      <h2 className="h2">Welcome! Please Login</h2>
      <LoginForm />
    </div>
  )
}

export default Login
