import React, { useState } from 'react'

import { Form, Button, Card, Alert } from "react-bootstrap"
import axios from 'axios'

import TodoForm from '../todo-form/TodoForm'
import config from '../../config'

const HouseholdForm = () => {
  const [name, setName] = useState('')
  const [householdUsers, setHouseholdUsers] = useState([])
  const [todos, setTodos] = useState([])
  const [addingToDo, setAddingToDo] = useState(false)

  const handleSubmitHousehold = (todo) => {
    axios({
      method: 'post',
      url: `${config.api}/household/newHousehold`,
      data: {
        /**Household fields - create a household context*/
      }
    })
  }

  return (
    <div className='new-household-wrapper'>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmitHousehold}>
            <Form.Label>Household Name</Form.Label>
            <Form.Control onChange={setName} value={name.value} type='text' placeholder='give your household a name' required />
          </Form>
          <ul>
            {todos && todos.map((todo, index) => {
              return <div>
                <h4>Todos</h4>
                <li key={index}>
                  {todo.todoName}
                </li>
              </div>
            })}
          </ul>
          <Button disabled={addingToDo} onClick={() => setAddingToDo(true)}>Add a new todo</Button>
          {addingToDo && <TodoForm todos={todos} setAddingToDo={setAddingToDo} />}
          {/**Create a context where we store field values from todoform and use them in "addTodo" method */}
        </Card.Body>
      </Card>
    </div>
  )
}

export default HouseholdForm
