import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenServices from '../../services/TokenService'

function PrivateRoute({ component: Component, roles, ...rest }) {
  return (
    <Route {...rest} render={props => {
      if (!TokenServices.getUser()) {
        // not logged in so redirect to login page with the return url
        return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      }

      // logged in so return component
      return <Component {...props} />
    }} />
  );
}

export default PrivateRoute