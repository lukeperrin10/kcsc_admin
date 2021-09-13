import store from '../state/store/configureStore'
import JtockAuth from 'j-tockauth'
import errorHandler from './ErrorHandler'
import axios from 'axios'

const auth = new JtockAuth({
  host: process.env.REACT_APP_API_URL,
  debug: false,
})

const Authentication = {
  async signIn(data) {
    try {
      let response = await auth.signIn(data.email.value, data.password.value)
      store.dispatch({
        type: 'AUTHENTICATE',
        payload: response.data.name,
      })
    } catch (error) {
      errorHandler(error)
    }
  },

  async signOut() {
    try {
      await auth.signOut()
      store.dispatch({
        type: 'LOG_OUT',
      })
    } catch (error) {
      errorHandler(error)
    }
  },

  async forgotPassword(event) {
    let email = event.target.email.value
    try {
      let response = await axios.post('/auth/password', {
        user: {
          email: email,
          //redirect_url: 'https://timotuz.com',
        },
      })
      debugger
    } catch (error) {
      debugger
    }
  },

  async validateToken() {
    try {
      const headers = JSON.parse(localStorage.getItem('J-tockAuth-Storage'))
      let response = await auth.validateToken(headers)
      store.dispatch({
        type: 'AUTHENTICATE',
        payload: response.data.name,
      })
    } catch (error) {}
  },
}

export default Authentication

export const getHeaders = () => {
  const headers = JSON.parse(localStorage.getItem('J-tockAuth-Storage'))
  const apiKey = process.env.REACT_APP_API_KEY
  return { ...headers, API_KEY: apiKey }
}
