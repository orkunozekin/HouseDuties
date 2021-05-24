import React, { useState } from 'react'

import { Route, Switch } from 'react-router-dom'

import NavigationBar from './components/navbar/NavigationBar'
import Login from './page/login/Login'
import Registration from './page/registration/Registration';
import Home from './page/home/Home'


import './App.scss'


function App() {

  //temporary state
  const [loggedIn, setLoggedIn] = useState(false)



  return (
    <div className='app'>
      <NavigationBar setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
      <Switch>
        <Route exact path='/'>
          <Login setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
        </Route>
        <Route exact path='/registration' component={Registration} />
        <Route exact path='/home'>
          <Home loggedIn={loggedIn} />
        </Route>
      </Switch>
    </div>
  );
}

export default App
