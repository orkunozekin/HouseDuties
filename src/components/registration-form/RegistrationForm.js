import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { Form, Col, Button } from 'react-bootstrap'
import bcrypt from 'bcryptjs'
import axios from 'axios'

import ValidationError from './ValidationError/ValidationError'
import config from '../../config'


const RegistrationForm = () => {


  const [email, setEmail] = useState({ value: '', touched: false })
  const [fullName, setFullName] = useState({ value: '', touched: false })
  const [password, setPassword] = useState({ value: '', touched: false })
  const [repeatPassword, setRepeatPassword] = useState({ value: '', touched: false })

  //emails to check against user's email at registration
  const [emails, setEmails] = useState([])

  let history = useHistory()


  //populate the emails at component mounting 
  // useEffect(() => {
  //   getAllEmails()
  // }, [])

  const getAllEmails = () => {
    axios.get(`${config.api}/getAllEmails`)
      .then((response) => {
        setEmails(response.data)

      })
      .catch((error) => {
        console.log(error)
      })
  }


  //Update the values of the state properties to trigger at the "onChange" attributes of the inputs.
  const updateEmail = (email) => {
    setEmail({ value: email, touched: true })
  }

  const updateFullName = (fullName) => {
    setFullName({ value: fullName, touched: true })
  }

  const updatePassword = (password) => {
    setPassword({ value: password, touched: true })
  }

  const updateRepeatPassword = (repeatPassword) => {
    setRepeatPassword({ value: repeatPassword, touched: true })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password.value, salt)
    fetch(`${config.api}/user/createNewUser`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          userEmail: email.value,
          userFullName: fullName.value,
          userPassword: hash,
        })
      }
    ).then(response => {
      console.log(response)
      response.text()
    })
  }

  //Basic form validations

  const validateEmail = () => {
    //Check the emails in the DB to ensure emails' uniqueness. 
    if (emails.includes(email.value.trim())) {
      return "Another account is already registered with this email"
    }
  }

  const validateFullName = () => {
    const fullNameValue = fullName.value.trim()
    if (!fullNameValue.length) {
      return "First name is required"
    }
  }


  const validatePassword = () => {
    const userPassword = password.value.trim()
    if (!userPassword.length) {
      return "Password is required"
    } else if (userPassword.length < 6 || userPassword.length > 72) {
      return "Password must be between 6 and 72 characters long"
    } else if (!userPassword.match(/[0-9]/)) {
      return "Password must contain at least one number"
    }
  }


  const validateRepeatPassword = () => {
    const userRepeatPassword = repeatPassword.value.trim()
    const userPassword = password.value.trim()

    if (userRepeatPassword !== userPassword) {
      return 'Passwords do not match'
    }
  }


  return (
    <div>
      <Form className="registration-form" onSubmit={e => handleSubmit(e)}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className="registration-control" type="email"
              placeholder="Enter email" onChange={e => updateEmail(e.target.value)} />
            {email.touched && <ValidationError message={validateEmail()} />}
          </Form.Group>

        </Form.Row>

        <Form.Group controlId="formGridAddress1">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            className="registration-control" type="text"
            placeholder="First Name" onChange={e => updateFullName(e.target.value)} />
          {fullName.touched && <ValidationError message={validateFullName()} />}
        </Form.Group>

        <Form.Group controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="registration-control" type="password"
            placeholder="Password" onChange={e => updatePassword(e.target.value)} />
          {password.touched && <ValidationError message={validatePassword()} />}
        </Form.Group>

        <Form.Group controlId="formGridPassword">
          <Form.Label>Validate Password</Form.Label>
          <Form.Control
            className="registration-control" type="password"
            placeholder="Password" onChange={e => updateRepeatPassword(e.target.value)} />
          {repeatPassword.touched && <ValidationError message={validateRepeatPassword()} />}
        </Form.Group>

        <Button className="registration-btn" variant="primary" type="reset">
          Cancel
        </Button>
        <Button className="registration-btn"
          variant="primary" type="submit"
          disabled={
            validateEmail() || validateFullName() || validatePassword() || validateRepeatPassword()
          }
        >
          Save
        </Button>
      </Form>
    </div>
  )
}

export default RegistrationForm
