import React, { useContext, useState } from 'react'

import axios from 'axios'
import config from '../config'
import TokenService from '../utility/TokenService'
import { useHistory } from 'react-router'
import { useAuth } from './AuthContext'


const TaskContext = React.createContext()

export function useTaskContext() {
  return useContext(TaskContext)
}


export const TaskProvider = ({ children }) => {


  const handleSubmitTask = (e, name, type, household) => {
    e.preventDefault()
    axios({
      method: 'post',
      url: `${config.api}/task/createNewTask`,
      data: {
        name: name,
        type: type,
        completed: false,
        userAssigned: null,
        completionDate: null,
        household: household
      }
    })
      .then(response => {
        console.log(response.data)
      })
  }

  const value = {
    handleSubmitTask
  }

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  )

}