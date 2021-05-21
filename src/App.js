import { Route, Switch } from 'react-router-dom'

import Login from './page/login/Login'
import Registration from './page/registration/Registration';

import './App.css'


function App() {

  //temporary state



  return (
    <div className="app">
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/registration' component={Registration} />
      </Switch>
    </div>
  );
}

export default App
