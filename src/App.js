import React, { useState } from 'react'

import { Route, Switch } from 'react-router-dom'

import Login from './page/login/Login'
import Registration from './page/registration/Registration';

import './App.css'


function App() {

  //temporary state
  const [loggedIn, setLoggedIn] = useState(false)


  return (
    <div className="app">
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
