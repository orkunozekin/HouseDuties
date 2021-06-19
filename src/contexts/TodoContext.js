import React, { useContext, useState, useEffect } from 'react'

import axios from 'axios'

import config from '../config'

const TodoContext = React.createContext()

export function useTodoContext() {
  return useContext(TodoContext)
}

export function TodoContextProvider({ children }) {

  const handleSubmitTodo = (e, name, type) => {
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
        householdOfTodo: null
      }
    })
      .then(response => {
        console.log(response.data)
      })
  }

  //delete (upon completion of to do)

  const value = {
    handleSubmitTodo,
  }

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  )
}
