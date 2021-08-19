import store from '../state/store/configureStore'
import { getHeaders } from './Authentication'
import errorHandler from './ErrorHandler'
import axios from 'axios'

const headers = getHeaders()

const Articles = {
  async index() {
    try {
      const response = await axios.get('/api/articles', { headers: headers })      
      store.dispatch({type: 'ARTICLES_INDEX', payload: response.data.articles})
    } catch (error) {
      errorHandler(error)
    }
  },
}

export default Articles
