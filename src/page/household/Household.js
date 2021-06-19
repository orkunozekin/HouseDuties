import React, { useState } from 'react'

import { Button } from 'react-bootstrap'

import TodoForm from '../../components/todo-form/TodoForm'

const Household = () => {

  const [addingToDo, setAddingToDo] = useState(false)


  return (
    <div className='household-wrapper'>
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
      {addingToDo && <Button onClick={() => setAddingToDo(false)}>Cancel</Button>}
    </div>
  )
}

export default Household
