import React from 'react'

import { Route, Switch } from 'react-router-dom'

import NavigationBar from './components/navbar/NavigationBar'
import Login from './page/login/Login'
import Registration from './page/registration/Registration'
import Home from './page/home/Home'
import NewHousehold from './page/new-household/NewHousehold'
import PrivateRoute from './utility/PrivateRoute'

import { TodoContextProvider } from './contexts/TodoContext'
import { AuthProvider } from './contexts/AuthContext'


import './App.scss'


function App() {


  return (
    <div className='app'>
      <AuthProvider>
        <TodoContextProvider>
          <NavigationBar />
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/registration' component={Registration} />
            <PrivateRoute exact path='/home' component={Home} />
            <PrivateRoute exact path='/newHousehold' component={NewHousehold} />
          </Switch>
        </TodoContextProvider>
      </AuthProvider>
    </div>
  );
}

export default App
