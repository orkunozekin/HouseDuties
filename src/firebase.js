import firebase from 'firebase/app'
import 'firebase/auth'

const app = firebase.initializeApp({
  apiKey: "AIzaSyAjFfK2b1whEeqitPdEdZ4KChcfdmaxRkg",
  authDomain: "house-duties-development.firebaseapp.com",
  projectId: "house-duties-development",
  storageBucket: "house-duties-development.appspot.com",
  messagingSenderId: "701283174806",
  appId: "1:701283174806:web:5ebd5b81ccb8ba862135b7",
  measurementId: "G-K0T8RCVF1R"
})

export const auth = app.auth()
export default app