import React, { useState } from 'react'

import { Form, Button, Card, Alert } from "react-bootstrap"
import axios from 'axios'

import TodoForm from '../todo-form/TodoForm'
import config from '../../config'

const HouseHoldForm = () => {
  const [name, setName] = useState('')
  const [householdUsers, setHouseholdUsers] = useState([])
  const [todos, setTodos] = useState([])
  const [addingToDo, setAddingToDo] = useState(false)

  const addTodo = (todo) => {
    axios({
      method: 'post',
      url: `${config.api}/household/newHousehold`,
      data: {
        
      }
    })
  }

  return (
    <div className='new-household-wrapper'>
      <Card>
        <Card.Body>
          <Form>
            <Form.Label>Household Name</Form.Label>
            <Form.Control onChange={setName} value={name.value} type='text' placeholder='give your household a name' required />
          </Form>
          <ul>
            <h4>Todos</h4>
            {todos && todos.map((todo, index) => {
              return <li key={index}>
                {todo.todoName}
              </li>
            })}
          </ul>
          <Button type='button'>Add a new todo</Button>
          {addingToDo && <TodoForm todos={todos} addTodo={addTodo} setAddingToDo={setAddingToDo} />}
        </Card.Body>
      </Card>
    </div>
  )
}

export default HouseHoldForm
