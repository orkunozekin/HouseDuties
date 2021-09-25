import React, { useState } from 'react'

import { Form, Button, Alert } from 'react-bootstrap'

import { useAuth } from '../../contexts/AuthContext'

const RegistrationForm = () => {

  const { register, error, loading, setError } = useAuth()

  const [email, setEmail] = useState('')
  const [fullname, setFullname] = useState('')
  const [password, setPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')

  return (
    <>
      <Form className="login-form" method="get" onSubmit={e => register(e, email, password, fullname, verifyPassword)}>
        {error && <Alert variant='danger'>{error}</Alert>}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" value={email}
            placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" name="fullname" value={fullname}
            placeholder="Full Name" onChange={e => setFullname(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={password}
            placeholder="Password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Verify Password</Form.Label>
          <Form.Control type="password" name="verifyPassword" value={verifyPassword}
            placeholder="verify your password" onChange={e => {
              setVerifyPassword(e.target.value)
            }} />
        </Form.Group>
        <Button disabled={loading} variant="warning" type="submit">
          Submit
        </Button>
      </Form>
    </>
  )
}

export default RegistrationForm
