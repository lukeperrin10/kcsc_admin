import store from '../state/store/configureStore'
import { getHeaders } from './Authentication'
import errorHandler from './ErrorHandler'
import axios from 'axios'

const headers = getHeaders()

const Information = {
  async index() {
    try {
        const response = await axios.get('/information', { headers: headers })
        store.dispatch({
          type: 'INFORMATION_INDEX',
          payload: response.data.information_items,
        })
    } catch (error) {
      errorHandler(error)
    }
  },

  async create(info) {
    try {
      let response = await axios.post(
        '/information',
        { information_item: info },
        { headers: headers }
      )
      store.dispatch({
        type: 'SET_SUCCESS',
        payload: response.data.message,
      })
    } catch (error) {
      errorHandler(error)
    }
  },

  async update_switch(itemId, attr, switchState) {
    try {
      debugger
      const response = await axios.post(`/information/${itemId}`, {
        [attr]: switchState,
      })
      store.dispatch({
        type: 'SET_SUCCESS',
        payload: response.data.message,
      })
      return 'success'
    } catch (error) {
      errorHandler(error)
      return 'error'
    }
  },
}

export default Information
