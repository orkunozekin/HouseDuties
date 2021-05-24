import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import TokenService from '../../TokenService'

const Home = () => {

  // const [hasHousehold, setHasHousehold] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    setUser(TokenService.getUser('user'))
    console.log(user);
  }, [])


  //tokenservice "user" has whether or not this user has a household
  return (
    <div className='home-wrapper'>
      {user && user.usersAdminHousehold !== null ?
        <h2>Your household</h2>
        :
        <Link to='/newHousehold'>Create a household</Link>
      }
    </div>
  )
}

export default Home
