import React, { useEffect } from 'react'

import { Link } from 'react-router-dom'

import { useAuth } from '../../contexts/AuthContext'

import TokenService from '../../utility/TokenService'

const Home = () => {


  const user = TokenService.getUser()

  // const [hasHousehold, setHasHousehold] = useState(false)

  const { currentUser } = useAuth()

  useEffect(() => {
    console.log("currentUser: ", currentUser);
  }, [])
  return (
    <div className='home-wrapper'>
      {user.household && user.household !== null ?
        <>
          <h2>{user.household.name}</h2>
          {user.household.todos.length > 0 ?
            <>
              <h3>Current House Duties</h3>
              <ul>
                {user.household.todos.map(todo =>
                  <li key={todo.id}>{todo.name}</li>
                )}
              </ul>
            </>
            :
            <>
              <Link to='/newTodo' />
            </>
          }

        </>
        :
        <Link to='/newHousehold'>Create a household</Link>
      }
    </div>
  )
}

export default Home
