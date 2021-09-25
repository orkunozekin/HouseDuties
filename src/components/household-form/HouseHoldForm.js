import React, { useState } from 'react'

import { Form, Button, Card, Alert } from "react-bootstrap"
import axios from 'axios'

import TodoForm from '../todo-form/TodoForm'
import config from '../../config'
import { useHouseholdContext } from '../../contexts/HouseholdContext'

const HouseholdForm = () => {
  const [name, setName] = useState('')


  const { todos, handleSubmitHousehold, addingToDo, setAddingToDo } = useHouseholdContext()



  return (
    <div className='new-household-wrapper'>
      <Card>
        <Card.Body>
          <Form onSubmit={e => handleSubmitHousehold(e, name)}>
            <Form.Label>Household Name</Form.Label>
            <Form.Control onChange={e => setName(e.target.value)} value={name} type='text' placeholder='give your household a name' required />
            <Button type="submit">Submit</Button>
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
          {/* <Button disabled={addingToDo} onClick={() => setAddingToDo(true)}>Add a new todo</Button> */}

          {/* {addingToDo && <TodoForm todos={todos} setAddingToDo={setAddingToDo} />} */}
          {/**Create a context where we store field values from todoform and use them in "addTodo" method */}
        </Card.Body>
      </Card>
    </div>
  )
}

export default HouseholdForm
