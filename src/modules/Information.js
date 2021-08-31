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
        const response = await axios.get('/information', { headers: headers })
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

  async create(info) {
    try {
      let response = await axios.post(
        'api/information',
        { info: info },
        { headers: headers }
      )
      Information.index()
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
