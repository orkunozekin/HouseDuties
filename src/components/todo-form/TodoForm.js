import React, { useState } from 'react'

import { Form, Button, Card, Alert } from 'react-bootstrap'
import axios from 'axios'

import TokenService from '../../utility/TokenService'
import config from '../../config'

import './TodoForm.scss'


const TodoForm = ({ setAddingToDo }) => {

  const [type, setType] = useState('')
  const [name, setName] = useState('')
  const [userAssigned, setUserAssigned] = useState({})

  const handleSubmitTodo = (e) => {
    e.preventDefault()

    axios({
      method: 'post',
      url: `${config.api}/todo/createNewTodo`,
      data: {
        todoName: name,
        todoType: type,
        todoCompleted: false,
        userAssigned: null,
        toDoCompletionDate: null,
      }
    })
      .then(response => {
        console.log(response.data)
        setAddingToDo(false)
      })
  }


  return (
    <Card className='todo-form-card'>
      <Card.Body>
        <Form onSubmit={handleSubmitTodo} className='todo-form'>
          <Form.Label>Todo Type</Form.Label>
          <Form.Control onChange={setType} value={type.value} as='select' required>
            <option>Laundry</option>
            <option>Cooking</option>
            <option>Trash</option>
            <option>Cleaning</option>
          </Form.Control>
          <Form.Label>Todo Name</Form.Label>
          <Form.Control onChange={setName} value={name.value} type='text' placeholder='name your todo' required />
        </Form>
      </Card.Body>
    </Card>
  )
}

export default TodoForm
