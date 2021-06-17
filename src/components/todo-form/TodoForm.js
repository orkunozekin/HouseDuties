import React, { useState } from 'react'

import { Form, Button, Card, Alert } from 'react-bootstrap'

import TokenService from '../../TokenService'
import config from '../../config'

import axios from 'axios'

const TodoForm = ({ addToDo, setAddingToDo }) => {

  const [type, setType] = useState('')
  const [name, setName] = useState('')
  const [userAssigned, setUserAssigned] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()

    axios({
      method: 'post',
      url: `${config.api}/`,
      data: {
        todoName: name,
        todoType: type,
        todoCompleted: false,
        userAssigned: null,
        toDoCompletionDate: null,
      }
    })

    setAddingToDo(false)
  }


  return (
    <Card className='todo-form-card'>
      <Card.Body>
        <Form onSubmit={addToDo} className='todo-form'>
          <Form.Label>Todo Type</Form.Label>
          <Form.Control value={type} as='select' required>
            <option>Laundry</option>
            <option>Cooking</option>
            <option>Trash</option>
            <option>Cleaning</option>
          </Form.Control>
          <Form.Label>Todo Name</Form.Label>
          <Form.Control value={name} type='text' placeholder='give your household a name' required />
        </Form>
      </Card.Body>
    </Card>
  )
}

export default TodoForm
