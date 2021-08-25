import store from '../state/store/configureStore'
import { getHeaders } from './Authentication'
import errorHandler from './ErrorHandler'
import axios from 'axios'

const _ = require('lodash')

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
  async update(attributes) {
    try {
      let response = {}
      for (const key in attributes) {
        let params = { key: key, value: attributes[key] }
        response = await axios.put(
          '/api/app_data',
          { params: params },
          { headers: headers }
        )
      }
      store.dispatch({
        type: 'SET_SUCCESS',
        payload: response.data.message,
      })
    } catch (error) {
      errorHandler(error)
    }
  },
  toNavigationObject(formData) {
    const main_tabs = formData.main_tabs.map((tab) => {
      let secondary_tabs = []
      if (tab.secondary_tabs) {
        secondary_tabs = tab.secondary_tabs.map((secTab) => {
          return {
            label: secTab.label,
            link: secTab.ref
              ? `/${_.snakeCase(tab.label)}`
              : `/${_.snakeCase(tab.label)}/${_.snakeCase(secTab.label)}`,
            ref: secTab.ref ? _.kebabCase(secTab.ref) : null,
            visible: secTab.visible,
          }
        })
      }

      return {
        label: tab.label,
        link:
          secondary_tabs.length !== 0
            ? secondary_tabs[1].link
            : `/${_.snakeCase(tab.label)}`,
        visible: tab.visible,
        secondary_tabs: !tab.secondary_tabs ? null : secondary_tabs,
      }
    })

    const secondary_tabs = []
    main_tabs.forEach((tab) => {
      if (tab.secondary_tabs) {
        tab.secondary_tabs.forEach((secTab) => {
          secondary_tabs.push({
            parent: tab.label,
            label: secTab.label,
            link: secTab.link,
          })
        })
      }
    })
    return {
      navigation: { main_tabs: main_tabs, secondary_tabs: secondary_tabs },
    }
  },
}

export default AppData
