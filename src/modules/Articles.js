import store from '../state/store/configureStore'
import { getHeaders } from './Authentication'
import errorHandler from './ErrorHandler'
import axios from 'axios'
import all_articles from '../data/fixtures/all_articles.json'

const headers = getHeaders()

const Articles = {
  async index() {
    try {
      if (window.Cypress) {
        const response = await axios.get('/api/articles', { headers: headers })
        store.dispatch({
          type: 'ARTICLES_INDEX',
          payload: response.data.articles,
        })
      } else {
        store.dispatch({
          type: 'ARTICLES_INDEX',
          payload: all_articles.articles,
        })
      }
    } catch (error) {
      errorHandler(error)
    }
  },

  async create(article) {
    let params = { article: article };
    try {
      let response = await axios.post('api/articles', params, {
        headers: headers,
      });
      Articles.index();
      store.dispatch({
        type: 'SET_SUBMIT',
        payload: { status: true, message: response.data.message },
      });
    } catch (error) {
      errorHandler(error);
    }
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


export const imageEncoder = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default Articles
