import store from '../state/store/configureStore'
import { getHeaders } from './Authentication'
import errorHandler from './ErrorHandler'
import axios from 'axios'
import all_articles from '../data/fixtures/all_articles.json'
import single_article from '../data/fixtures/single_article.json'

const headers = getHeaders()

const Articles = {
  async index() {
    try {
      //if (window.Cypress) {
      const response = await axios.get('/articles', { headers: headers })
      store.dispatch({
        type: 'ARTICLES_INDEX',
        payload: response.data.articles,
      })
      //} else {
      // store.dispatch({
      //   type: 'ARTICLES_INDEX',
      //   payload: all_articles.articles,
      // })
      //}
    } catch (error) {
      errorHandler(error)
    }
  },

  async create(article) {
    const { title, body, image } = article
    let params = { article: { title: title, body: body, image: image } }
    try {
      let response = await axios.post('/articles', params, { headers: headers })
      //Articles.index()
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
      //if (window.Cypress) {
      const response = await axios.get(`/articles/${id}`, {
        headers: headers,
      })
      return response.data
      //} else {
      // return single_article
      //}
    } catch (error) {
      errorHandler(error)
    }
  },

  async update(article) {
    let params = { article: article }
    try {
      let response = await axios.put(`/articles/${article.id}`, params, {
        headers: headers,
      })
      Articles.index()
      store.dispatch({
        type: 'SET_SUCCESS',
        payload: response.data.message,
      })
    } catch (error) {
      errorHandler(error)
    }
  },

  async update_publish(id, publish) {
    try {
      const response = await axios.post(
        `/articles/${id}`,
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
