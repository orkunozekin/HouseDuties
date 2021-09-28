import React, { useContext, useState } from 'react'

import axios from 'axios'
import config from '../config'
import TokenService from '../utility/TokenService'
import { useHistory } from 'react-router'
import { useAuth } from './AuthContext'

const HouseholdContext = React.createContext()

export function useHouseholdContext() {
  return useContext(HouseholdContext)
}

export const HouseholdProvider = ({ children }) => {

  const { setCurrentUser, currentUser } = useAuth()

  let history = useHistory()

  const [householdUsers, setHouseholdUsers] = useState([])

  const handleSubmitHousehold = async (e, name) => {
    e.preventDefault()
    await axios({
      method: 'post',
      url: `${config.api}/household/newHousehold`,
      data: {
        /**Household fields - create a household context*/
        name: name,
        tasks: [],
        users: [TokenService.getUser()]
      }
    })
      .then(res => {
        console.log(res.data)
        setCurrentUser({ ...currentUser, household: res.data })
        TokenService.saveUser({ ...currentUser, household: res.data })
        history.push('/home')
      })
      .catch(err => console.log(err))
  }

  const value = {
    handleSubmitHousehold,
    setHouseholdUsers,
    householdUsers,
  }

  return (
    <div>
      <HouseholdContext.Provider value={value}>
        {children}
      </HouseholdContext.Provider>
    </div>
  )
}