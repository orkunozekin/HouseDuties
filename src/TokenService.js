
const TokenService = {

  // To set the user to the localStorage.
  saveUser(user) {
    window.localStorage.setItem('user', JSON.stringify(user));
  },

  // This is to get the user from the localStorage
  getUser() {
    return JSON.parse(window.localStorage.getItem('user'));
  },

  // Clears the user from the current localStorage
  clearAuthToken() {
    window.localStorage.removeItem('user');
  },

  // This is for checking to see if user has authorization for being logged in. 
  hasAuthToken() {
    return !!TokenService.getUser();
  },


  // makeBasicAuthToken(userName, password) {
  //     return window.btoa(`${userName}:${password}`)
  // },
}

export default TokenService;
