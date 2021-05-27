import React, { useState } from 'react'

import { Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import NavigationBar from './components/navbar/NavigationBar'
import Login from './page/login/Login'
import Registration from './page/registration/Registration';
import Home from './page/home/Home'
import PrivateRoute from './routes/private-route/PrivateRoute'
import { history } from './redux/helpers'
import { alertActions } from './redux/actions'
import { LoginPage } from './page/login-page'


import './App.scss'


function App() {

  //temporary state
  const [loggedIn, setLoggedIn] = useState(false)



  return (
    <div className='app'>
      <NavigationBar setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
      <Switch>
        {/* <Route exact path='/'>
          <Login setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
        </Route> */}
        <Route exact path='/registration' component={Registration} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/'>
          <Home loggedIn={loggedIn} />
        </Route>
      </Switch>
    </div>
  );
}

export default App
