import React, { useState, useEffect } from 'react'

import { Form, Button, Card, Alert } from 'react-bootstrap'
import axios from 'axios'

import { useTaskContext } from '../../contexts/TaskContext'
import { useAuth } from '../../contexts/AuthContext'
import TokenService from '../../utility/TokenService'


import './TaskForm.scss'


const TaskForm = () => {

  const { handleSubmitTask } = useTaskContext()
  const { currentUser } = useAuth()

  const [type, setType] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    console.log("currentUser from TaskForm:", currentUser);
  }, [currentUser]);


  return (
    <Card className='task-form-card'>
      <Card.Body>
        <Form onSubmit={e => handleSubmitTask(e, name, type, currentUser.household)} className='task-form'>
          <Form.Label>Task Type</Form.Label>
          <Form.Control onChange={e => setType(e.target.value)} value={type} as='select' required>
            <option>Laundry</option>
            <option>Cooking</option>
            <option>Trash</option>
            <option>Cleaning</option>
          </Form.Control>
          <Form.Label>Task Name</Form.Label>
          <Form.Control onChange={e => setName(e.target.value)} value={name} type='text' placeholder='name your task' required />
          <Button type='submit'>Submit</Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default TaskForm
