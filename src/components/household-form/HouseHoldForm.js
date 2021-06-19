import React, { useState } from 'react'

import { Form, Button, Card, Alert } from "react-bootstrap"
import axios from 'axios'

import config from '../../config'
import TokenService from '../../utility/TokenService'

const HouseholdForm = () => {
  const [name, setName] = useState('')
  const [householdUsers, setHouseholdUsers] = useState([])

  const handleSubmitHousehold = (ev) => {
    ev.preventDefault()
    console.log(TokenService.getUser('user'))
    axios({
      method: 'post',
      url: `${config.api}/household/newHousehold`,
      data: {
        householdName: name.target.value,
        householdAdmin: TokenService.getUser('user'),
        householdUsers: [],
        todos: []
      }
    })
      .then(response => console.log(response))
  }

  return (
    <div className='new-household-wrapper'>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmitHousehold}>
            <Form.Label>Household Name</Form.Label>
            <Form.Control onChange={setName} value={name.value} type='text' placeholder='give your household a name' required />
            <Button type='submit'>Create Household</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default HouseholdForm
