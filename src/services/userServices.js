import config from '../config'
import TokenService from './TokenService'

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete
}

const login = (email, password) => {
  axios.post(`${config.api}/user/login?email=${email.value}`)
    .then((response) => {
      console.log(response);
      if (response.data.userId && bcrypt.compareSync(password.value, response.data.userPassword) === true) {
        TokenService.saveUser(response.data)
        setLoggedIn(true)
        history.push('/home')
      } else {
        alert("Incorrect email and password combination")
      }
    }, (error) => {
      console.log(error)
    })
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });