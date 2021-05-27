import config from '../config'
import TokenService from './TokenService'
import { history } from '../redux/helpers'

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete
}

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${config.api}/user/login?email=${username}&password=${password}`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  TokenService.clearAuthToken()
}

function getAll() {
  const requestOptions = {
    method: 'GET',
  };

  return fetch(`${config.api}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
  };

  return fetch(`${config.api}/user/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return fetch(`${config.api}/user/createNewUser`, requestOptions).then(handleResponse);
}

function update(user) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return fetch(`${config.api}/user/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: 'DELETE',
  };

  return fetch(`${config.api}/user/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        history.push('/')
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  })
}