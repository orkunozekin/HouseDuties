import React from 'react'
import LoginForm from '../../components/login-form/LoginForm'

const Login = ({ setLoggedIn, loggedIn }) => {
  return (
    <div>
      <LoginForm setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
    </div>
  )
}

export default Login
