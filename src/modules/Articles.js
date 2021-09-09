import store from '../state/store/configureStore'
import { getHeaders } from './Authentication'
import errorHandler from './ErrorHandler'
import axios from 'axios'

const headers = getHeaders()

const Articles = {
  async index() {
    try {
      const response = await axios.get('/articles', { headers: headers })
      store.dispatch({
        type: 'ARTICLES_INDEX',
        payload: response.data.articles,
      })
    } catch (error) {
      errorHandler(error)
    }
  },

  async create(article) {
    const { title, body, image, alt } = article
    let params = { article: { title: title, body: body, image: image, alt: alt } }
    try {
      await axios.post('/articles', params, { headers: headers })
      store.dispatch({
        type: 'SET_SUCCESS',
        payload: 'Article has been created',
      })
      Articles.index()
    } catch (error) {
      errorHandler(error)
    }
  },

  async show(id) {
    try {
      const response = await axios.get(`/articles/${id}`, {
        headers: headers,
      })
      return response.data
    } catch (error) {
      errorHandler(error)
    }
  },

  async update(article) {
    try {
      await axios.put(`/articles/${article.article.id}`, article, {
        headers: headers,
      })
      Articles.index()
      store.dispatch({
        type: 'SET_SUCCESS',
        payload: 'Article has been updated',
      })
    } catch (error) {
      errorHandler(error)
    }
  },

  async update_publish(id, publish) {
    try {
      await axios.put(
        `/articles/${id}`,
        { article: { id: id, published: publish } },
        { headers: headers }
      )
      const action = publish ? 'published' : 'hidden'
      store.dispatch({
        type: 'SET_SUCCESS',
        payload: `Article has been ${action}`,
      })
      return 'success'
    } catch (error) {
      errorHandler(error)
      return 'error'
    }
  },
}

export default Articles
