import store from '../state/store/configureStore'
import JtockAuth from 'j-tockauth'
import errorHandler from './ErrorHandler'

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

  async resetPassword(event) {
    let email = event.target.email.value
    try {
      let response = await auth.resetPassword(email, 'timotuz.com')
      return response.data.message
    } catch (error) {
      errorHandler(error)
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
