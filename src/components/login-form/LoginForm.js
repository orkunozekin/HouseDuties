import React, { useState, useEffect } from 'react'

import { Form, Button, Alert } from 'react-bootstrap'
import { Link } from "react-router-dom"

import { useAuth } from '../../contexts/AuthContext'


import './LoginForm.scss'


const LoginForm = () => {


  const { login, error, loading, currentUser } = useAuth()

  //state
  const [email, setEmail] = useState({ value: '', touched: false })
  const [password, setPassword] = useState({ value: '', touched: false })

  //Update the values of the state properties to trigger at the "onChange" attributes of the inputs.
  const updateEmail = (email) => {
    setEmail({ value: email, touched: true })
  }

  const updatePassword = (password) => {
    setPassword({ value: password, touched: true })
  }

  useEffect(() => {
    currentUser && setEmail({ value: currentUser.userEmail })
  }, [])


  return (
    <>
      <Form className="login-form" method="get" onSubmit={ev => login(ev, email, password)}>
        {error && <Alert variant='danger'>{error}</Alert>}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" value={email.value}
            placeholder="Enter email" onChange={e => updateEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={password.value}
            placeholder="Password" onChange={e => updatePassword(e.target.value)} />
        </Form.Group>
        <Link to="/registration">Don't have an account?</Link><br /> <br />
        <Link to="/email-reset-password">Reset password</Link><br /> <br />
        <Button disabled={loading} variant="warning" type="submit">
          Submit
        </Button>
      </Form>
    </>
  )
}

export default LoginForm
