import config from '../config'

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete
}

const login = (ev, email, password) => {
  ev.preventDefault()
  axios.post(`${config.api}/user/login?email=${email.value}`)
    .then((response) => {
      console.log(response);
      if (response.data.userId && bcrypt.compareSync(password.value, response.data.userPassword) === true) {
        /*check user's password input against the password that comes from the server */
        /*if they are the same, then   TokenService.saveUser(response.data), if wrong, display an error message  */
        /* in the home page and navbar, call TokenService.hasAuthToken to make sure user had authorization. */
        //set the user object to the localStorage for persistence as "user".
        console.log(bcrypt.compareSync(password.value, response.data.userPassword));

        TokenService.saveUser(response.data)
        setLoggedIn(true)
        //route to the user home if credentials are correct
        history.push('/home')
      } else {
        alert("Incorrect email and password combination")
      }
    }, (error) => {
      console.log(error)
    })
}