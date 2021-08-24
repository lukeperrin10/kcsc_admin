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
  async update(params) {
    try {
      let response = {}  
      for (const key in params) {
        let appDataKey = { [key]: params[key] }  
        response = await axios.post(
          '/api/app_data',
          { params: appDataKey },
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
