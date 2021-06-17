import { createState } from '@hookstate/core'

// const store = createState({})

const store = {
  user: createState({}),
  loggedIn: createState(false)
}

export default store