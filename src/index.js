import React from 'react'
import App from './App'
import { Provider } from 'react-redux'
import store from './state/store/configureStore'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { BrowserRouter as Router } from 'react-router-dom'

const getHeaders = () => {
  return JSON.parse(localStorage.getItem('J-tockAuth-Storage'))
}
axios.defaults.baseURL = process.env.REACT_APP_API_URL
axios.defaults.headers.common = getHeaders()

if (window.Cypress) {
  window.store = store
}

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,

  document.getElementById('root')
)


