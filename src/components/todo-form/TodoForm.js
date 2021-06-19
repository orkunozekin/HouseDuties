import React, { useState } from 'react'

import { Form, Button, Card } from 'react-bootstrap'

import { useTodoContext } from '../../contexts/TodoContext'

import './TodoForm.scss'


const TodoForm = ({ setAddingToDo }) => {

  const { handleSubmitTodo } = useTodoContext()

  const [type, setType] = useState('')
  const [name, setName] = useState('')

  return (
    <Card className='todo-form-card'>
      <Card.Body>
        <Form onSubmit={(e) => {
          handleSubmitTodo(e, name, type)
          setAddingToDo(false)
        }}
          className='todo-form'>
          <Form.Label>Todo Type</Form.Label>
          <Form.Control onChange={setType} value={type.value} as='select' required>
            <option>Laundry</option>
            <option>Cooking</option>
            <option>Trash</option>
            <option>Cleaning</option>
          </Form.Control>
          <Form.Label>Todo Name</Form.Label>
          <Form.Control onChange={setName} value={name.value} type='text' placeholder='name your todo' required />
          <Button type='submit'>Add</Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default TodoForm
