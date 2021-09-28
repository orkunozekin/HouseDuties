import React, { useEffect } from 'react'

import { Button } from "react-bootstrap"
import { Link } from 'react-router-dom'

import { useAuth } from '../../contexts/AuthContext'
import TokenService from '../../utility/TokenService'

const Home = () => {


  const user = TokenService.getUser()

  const { currentUser } = useAuth()

  useEffect(() => {
    console.log("currentUser: ", currentUser);
  }, [])

  const household = user.household

  return (
    <div className='home-wrapper'>
      {user.household && user.household !== null ?
        <>
          <h2>{household.name}</h2>
          {household.tasks.length > 0 ?
            <>
              <h3>Current House Duties</h3>
              <ul>
                {household.tasks.map(task =>
                  <li key={task.id}>{task.name}</li>
                )}
              </ul>
            </>
            :
            <>
              <ul>
                {household.tasks.length > 0 && household.tasks.map((task, index) => {
                  return <div>
                    <h4>Tasks</h4>
                    <li key={index}>
                      {task.name}
                    </li>
                  </div>
                })}
              </ul>
              <Link to='/newTask'>
                <Button>Add a new task</Button>
              </Link>
            </>
          }
        </>
        :
        <Link to='/newHousehold'>
          <Button>Create a household</Button>
        </Link>
      }
    </div>
  )
}

export default Home
