import React, { useState } from 'react'

import { Form, Button, Alert } from 'react-bootstrap'
import { Link } from "react-router-dom"

import { useAuth } from '../../contexts/AuthContext'


import './LoginForm.scss'


const LoginForm = () => {


  const { login, error, loading } = useAuth()

  //state

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  return (
    <>
      <Form className="login-form" method="get" onSubmit={ev => login(ev, email, password)}>
        {error && <Alert variant='danger'>{error}</Alert>}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" value={email}
            placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={password}
            placeholder="Password" onChange={e => setPassword(e.target.value)} />
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
