import React, { useContext, useState } from 'react'

import axios from 'axios'
import config from '../config'
import TokenService from '../utility/TokenService'
import { useHistory } from 'react-router'

const HouseholdContext = React.createContext()

export function useHouseholdContext() {
  return useContext(HouseholdContext)
}

export const HouseholdProvider = ({ children }) => {

  let history = useHistory()

  const [todos, setTodos] = useState([])
  const [householdUsers, setHouseholdUsers] = useState([])
  const [addingToDo, setAddingToDo] = useState(false)

  const handleSubmitHousehold = async (e, name) => {
    e.preventDefault()
    console.log("name:", name);
    console.log("userTokS:", TokenService.getUser());
    await axios({
      method: 'post',
      url: `${config.api}/household/newHousehold`,
      data: {
        /**Household fields - create a household context*/
        name: name,
        todos: [],
        users: [TokenService.getUser()]
      }
    })
      .then(res => {
        console.log(res.data);
        history.push('/home')
      })
      .catch(err => console.log(err))
  }

  const value = {
    handleSubmitHousehold,
    setHouseholdUsers,
    setAddingToDo,
    setTodos,
    householdUsers,
    todos,
    addingToDo,
  }

  return (
    <div>
      <HouseholdContext.Provider value={value}>
        {children}
      </HouseholdContext.Provider>
    </div>
  )
}