import React, { useState } from 'react'

import { Route, Switch } from 'react-router-dom'

import Login from './page/login/Login'
import Registration from './page/registration/Registration';
import NavigationBar from './components/navbar/NavigationBar'

import './App.scss'


function App() {

  //temporary state
  const [loggedIn, setLoggedIn] = useState(false)


  return (
    <div className="app">
      <NavigationBar setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
      <Switch>
        <Route exact path='/'>
          <Login setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
        </Route>
        <Route exact path='/registration' component={Registration} />
      </Switch>
    </div>
  );
}

export default App
