import React, { useContext, useState, useEffect } from 'react'

import { useHistory } from 'react-router-dom'
import axios from 'axios'
import bcrypt from 'bcryptjs'

import config from '../config'
import TokenService from '../utility/TokenService'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState({})
  const [error, setError] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)

  const history = useHistory()

  async function register(ev, email, password, fullName, verifyPassword) {
    console.log("password: ", password)
    console.log("email: ", email)
    console.log("fullName: ", fullName)
    ev.preventDefault()
    if (verifyPassword !== password) {
      setError('Passwords do not match')
    } else {
      setError('')
      setLoading(true)
      let salt = bcrypt.genSaltSync(10)
      let hash = bcrypt.hashSync(password, salt)
      await axios({
        method: 'post',
        url: `${config.api}/user/createNewUser`,
        data: {
          email: email,
          fullName: fullName,
          password: hash,
        }
      })
        .then(response => {
          console.log(response.data)
          setLoading(false)
          setCurrentUser(response.data)
          history.push('/')
        })
        .catch(error => console.log(error))
    }

  }

  async function login(ev, email, password) {
    ev.preventDefault()
    setLoading(true)
    await axios({
      method: 'post',
      url: `${config.api}/user/login?email=${email}`
    })
      .then((response) => {
        if (response.data.id && bcrypt.compareSync(password, response.data.password) === true) {
          setCurrentUser(response.data)
          TokenService.saveUser(response.data)
          setLoggedIn(true)
          setError('')
          history.push('/home')
        } else {
          setError('Your email address and password combination is incorrect!')
        }
        setLoading(false)
      })
      .catch(error => {
        setError(error)
      })
  }

  async function logout() {
    TokenService.clearAuthToken()
    setCurrentUser({})
    setLoggedIn(false)
    history.push('/')
  }


  useEffect(() => {
    setError('')
  }, []);


  const value = {
    register,
    login,
    logout,
    setError,
    currentUser,
    loggedIn,
    loading,
    error
  }

  return (
    <div>
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}


