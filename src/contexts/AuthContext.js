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
  const [loading, setLoading] = useState(false)

  const history = useHistory()

  async function register(ev, email, password, fullName) {
    console.log(password.target.value);
    ev.preventDefault()
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password.target.value, salt)
    await axios({
      method: 'post',
      url: `${config.api}/user/createNewUser`,
      data: {
        userEmail: email.target.value,
        userFullName: fullName.target.value,
        userPassword: hash,
      }
    })
      .then(response => {
        console.log(response.data)
        setCurrentUser(response.data)
        history.push('/')
      })
      .catch(error => console.log(error))
  }

  async function login(ev, email, password) {
    ev.preventDefault()
    setLoading(true)
    await axios({
      method: 'post',
      url: `${config.api}/user/login?email=${email.value}`
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.userId && bcrypt.compareSync(password.value, response.data.userPassword) === true) {
          setCurrentUser(response.data)
          TokenService.saveUser(response.data)
          setError('')
          setLoading(false)
          history.push('/home')
        } else {
          setError('Your email address and password combination is incorrect!')
        }
      })
      .catch(error => console.log(error))
  }

  function logout() {
    TokenService.clearAuthToken()
    setCurrentUser({})
    history.push('/')
  }


  useEffect(() => {
    console.log(TokenService.getUser('user'));
    const unsubscribe = () => {
      setCurrentUser(TokenService.getUser('user'))
      setError('')
    }
    return unsubscribe
  }, []);


  const value = {
    register,
    login,
    logout,
    setError,
    currentUser,
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


