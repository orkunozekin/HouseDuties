import React, { useEffect } from 'react'

import { Link } from 'react-router-dom'

import { useAuth } from '../../contexts/AuthContext'

const Home = () => {

  const { currentUser } = useAuth()

  // const [hasHousehold, setHasHousehold] = useState(false)

  useEffect(() => {
    console.log(currentUser);
  }, [])


  return (
    <div className='home-wrapper'>
      {currentUser.household !== null ?
        <h2>Your household</h2>
        :
        <Link to='/newHousehold'>Create a household</Link>
      }
    </div>
  )
}

export default Home
