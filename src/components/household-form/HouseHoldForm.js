import React, { useState } from 'react'

import { Form, Button, Card, Alert } from "react-bootstrap"

import config from '../../config'
import { useHouseholdContext } from '../../contexts/HouseholdContext'

const HouseholdForm = () => {
  const [name, setName] = useState('')


  const { handleSubmitHousehold } = useHouseholdContext()

  return (
    <div className='new-household-wrapper'>
      <Card>
        <Card.Body>
          <Form onSubmit={e => handleSubmitHousehold(e, name)}>
            <Form.Label>Household Name</Form.Label>
            <Form.Control onChange={e => setName(e.target.value)} value={name} type='text' placeholder='give your household a name' required />
            <Button type="submit">Submit</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default HouseholdForm
