import React, { useState } from 'react'

import { Form, Button } from 'react-bootstrap';
import { useHistory, Link } from "react-router-dom"
import axios from 'axios'
import config from '../../config'
import bcrypt from 'bcryptjs'

import TokenService from '../../TokenService'

const LoginForm = ({ setLoggedIn, loggedIn }) => {

  //router props history to change the URI.
  let history = useHistory()


  //state
  const [email, setEmail] = useState({ value: '', touched: false })
  const [password, setPassword] = useState({ value: '', touched: false })



  //post request for logging in. 
  const checkLogin = (ev) => {
    ev.preventDefault()
    axios.post(`${config.api}/user/login?email=${email.value}`)
      .then((response) => {
        if (response) {
          if (response.data.userId) {
            /*check user's password input against the password that comes from the server */
            /*if they are the same, then   TokenService.saveUser(response.data), if wrong, display an error message  */
            /* in the home page and navbar, call TokenService.hasAuthToken to make sure user had authorization. */
            //set the user object to the localStorage for persistence as "user".
            console.log(bcrypt.compareSync(password.value, response.data.userPassword));
            if (bcrypt.compareSync(password.value, response.data.userPassword) === true) {
              TokenService.saveUser(response.data)
              setLoggedIn(true)
              //route to the user home if credentials are correct
              history.push('/home')
            }
            else {
              alert("Incorrect email and password combination")
            }
          }
        } else {
          console.log("no response");
        }

      }, (error) => {
        console.log(error)
      })
  }

  //Update the values of the state properties to trigger at the "onChange" attributes of the inputs.
  const updateEmail = (email) => {
    setEmail({ value: email, touched: true })
  }

  const updatePassword = (password) => {
    setPassword({ value: password, touched: true })
  }


  return (
    <div>
      <Form className="login-form" method="get" onSubmit={(ev) => checkLogin(ev)}>
        <h2 className="login-page-h2">Welcome! Please Login</h2>
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
        <Button variant="warning" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
