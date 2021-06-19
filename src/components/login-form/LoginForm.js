import React, { useState, useEffect } from 'react'

import { Form, Button, Alert } from 'react-bootstrap'
import { Link } from "react-router-dom"

import { useAuth } from '../../contexts/AuthContext'

import './LoginForm.scss'


const LoginForm = () => {


  const { login, error, loading, currentUser, setLoading, setError } = useAuth()

  //state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  useEffect(() => {
    setLoading(false)
    setError('')
  }, [])


  return (
    <>
      <Form className="login-form" method="get" onSubmit={ev => login(ev, email, password)}>
        {error && <Alert variant='danger'>{error}</Alert>}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onChange={setEmail} type='email' value={email.value}
            placeholder="Enter email" required />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={setPassword} type="password" value={password.value}
            placeholder="Password" required />
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
