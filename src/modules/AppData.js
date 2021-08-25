import store from '../state/store/configureStore'
import { getHeaders } from './Authentication'
import errorHandler from './ErrorHandler'
import axios from 'axios'

const headers = getHeaders()

const AppData = {
  async index() {
    try {
      const response = await axios.get('/api/app_data', { headers: headers })
      store.dispatch({
        type: 'APP_DATA_INDEX',
        payload: response.data.app_data,
      })
    } catch (error) {
      errorHandler(error)
    }
  },
  async update(attributes) {
    try {
      let response = {}  
      for (const key in attributes) {
        let params = { key: key, value: attributes[key] }  
        response = await axios.put(
          '/api/app_data',
          { params: params },
          { headers: headers }
        )        
      }
      store.dispatch({
        type: 'SET_SUCCESS',
        payload: response.data.message,
      })
    } catch (error) {
      errorHandler(error)
    }
  },
}

export default AppData
