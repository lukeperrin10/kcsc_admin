import store from '../state/store/configureStore'
import { getHeaders } from './Authentication'
import errorHandler from './ErrorHandler'
import axios from 'axios'

const headers = getHeaders()

const Articles = {
  async index() {
    try {
      const response = await axios.get('/api/articles', { headers: headers })
      store.dispatch({
        type: 'ARTICLES_INDEX',
        payload: response.data.articles,
      })
    } catch (error) {
      errorHandler(error)
    }
  },

  async show(id) {
    try {
      let response = await axios.get(`/api/articles/${id}`, {
        headers: headers,
      })
      return response.data.article
    } catch (error) {}
  },
  async update_publish(id, publish) {
    try {
      const response = await axios.post(
        `/api/articles/${id}`,
        { publish: publish },
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

export default Articles
