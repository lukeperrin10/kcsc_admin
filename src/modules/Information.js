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

  async show(id) {
    try {
      const response = await axios.get(`/information/${id}`, {
        headers: headers,
      })
      return response.data
    } catch (error) {
      errorHandler(error)
    }
  },

  async update(information_item) {
    let params = { information: information_item }
    try {
      let response = await axios.put(`/information/${information_item.id}`, params, {
        headers: headers,
      })
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
      await axios.put(`/information/${itemId}`, {
        [attr]: switchState,
        id: itemId,
      })
      store.dispatch({
        type: 'SET_SUCCESS',
        payload: 'Updated successfully',
      })
      return 'success'
    } catch (error) {
      errorHandler(error)
      return 'error'
    }
  },
}

export default Information
