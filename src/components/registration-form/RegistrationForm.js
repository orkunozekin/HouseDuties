import React, { useState } from 'react'
import { Form, Col, Button } from 'react-bootstrap'

import { useAuth } from '../../contexts/AuthContext'

import './RegistrationForm.scss'


const RegistrationForm = () => {

  const { loading, register, error, setError } = useAuth()


  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  //emails to check against user's email at registration
  const [emails, setEmails] = useState([])


  //populate the emails at component mounting 
  // useEffect(() => {
  //   getAllEmails()
  // }, [])

  // const getAllEmails = () => {
  //   axios.get(`${config.api}/getAllEmails`)
  //     .then((response) => {
  //       setEmails(response.data)

  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }


  //Basic form validations

  const validateEmail = () => {
    //Check the emails in the DB to ensure emails' uniqueness. 
    if (emails.includes(email)) {
      setError('Another account is already registered with this email')
    }
  }

  const validateFullName = () => {
    const fullNameValue = fullName
    if (!fullNameValue.length) {
      setError('First name is required')
    }
  }


  const validatePassword = () => {
    const userPassword = password
    if (!userPassword.length) {
      setError('Password is required')
    } else if (userPassword.length < 6 || userPassword.length > 72) {
      setError('Password must be between 6 and 72 characters long')
    } else if (!userPassword.match(/[0-9]/)) {
      setError('Password must contain at least one number')
    }
  }


  const validateRepeatPassword = () => {
    const userRepeatPassword = repeatPassword
    const userPassword = password

    if (userRepeatPassword !== userPassword) {
      setError('Passwords do not match')
    }
  }


  return (
    <Form className='registration-form' onSubmit={ev => register(ev, email, password, fullName)}>
      <Form.Row>
        <Form.Group as={Col} controlId='formGridEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            className='registration-control' type='email'
            placeholder='Enter email' onChange={setEmail} value={email.value} />
        </Form.Group>
      </Form.Row>

      <Form.Group controlId='formGridAddress1'>
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          className='registration-control' type='text'
          placeholder='First Name' onChange={setFullName} value={fullName.value} />
      </Form.Group>

      <Form.Group controlId='formGridPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          className='registration-control' type='password'
          placeholder='Password' onChange={setPassword} value={password.value} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Validate Password</Form.Label>
        <Form.Control
          className='registration-control' type='password'
          placeholder='Validate Password' onChange={setRepeatPassword} value={repeatPassword.value} />
      </Form.Group>

      <div className='btn-group'>
        <Button className='registration-btn' variant='primary' type='reset'>
          Cancel
        </Button>
        <Button className='registration-btn'
          variant='primary' type='submit'>
          Save
        </Button>
      </div>

    </Form>
  )
}

export default RegistrationForm
