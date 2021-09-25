import React, { useState } from 'react'

import { Route, Switch } from 'react-router-dom'

import NavigationBar from './components/navbar/NavigationBar'
import Login from './page/login/Login'
import Registration from './page/registration/Registration'
import Home from './page/home/Home'
import PrivateRoute from './utility/PrivateRoute'

import './App.scss'
import NewHousehold from './page/new-household/NewHousehold'
import { AuthProvider } from './contexts/AuthContext'
import { HouseholdProvider } from './contexts/HouseholdContext'


function App() {


  return (
    <div className='app'>
      <AuthProvider>
        <HouseholdProvider>
          <NavigationBar />
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/registration' component={Registration} />
            <PrivateRoute exact path='/home' component={Home} />
            <PrivateRoute exact path='/newHousehold' component={NewHousehold} />
          </Switch>
        </HouseholdProvider>
      </AuthProvider>
    </div>
  );
}

export default App
