import store from '../state/store/configureStore'
import { getHeaders } from './Authentication'
import errorHandler from './ErrorHandler'
import axios from 'axios'
import information from '../data/fixtures/information_items.json'


const headers = getHeaders()

const Information = {
  async index() {
    try {
      if (window.Cypress) {
        const response = await axios.get('/api/information', { headers: headers })
        store.dispatch({
          type: 'INFORMATION_INDEX',
          payload: response.data.information_items, 
        })
      } else {
        store.dispatch({
          type: 'INFORMATION_INDEX',
          payload: information.information_items,
        })
      }
    } catch (error) {
      errorHandler(error)
    }
  },

  async update_publish(id, publish, pinned) {
    try {
      const response = await axios.post(
        `/api/information/${id}`,
        { publish: publish },
        { pinned: pinned },
        { headers: headers }
      )
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