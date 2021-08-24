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
}

export default AppData
