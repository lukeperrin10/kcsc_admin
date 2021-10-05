import store from '../state/store/configureStore'
import { getHeaders } from './Authentication'
import errorHandler from './ErrorHandler'
import axios from 'axios'

const _ = require('lodash')

const AppData = {
  async index() {
    try {
      const headers = getHeaders()
      const response = await axios.get('/app_data', { headers: headers })
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
      for (const key in attributes) {
        const headers = getHeaders()
        let params = { key: key, value: attributes[key] }
        await axios.put('/app_data', params, { headers: headers })
      }
      AppData.index()
      store.dispatch({
        type: 'SET_SUCCESS',
        payload: 'Info has been updated',
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
            // should check for .ref attr when form is expanded to include it
            // current condition assumes all secTabs in services are .ref tabs
            link: (tab.label === 'services')
              ? `/${_.snakeCase(tab.label)}`
              : `/${_.snakeCase(tab.label)}/${_.snakeCase(secTab.label)}`,
            ref: secTab.ref ? _.kebabCase(secTab.ref) : null,
            visible: null,
          }
        })
      }

      return {
        label: tab.label,
        link:
          secondary_tabs.length !== 0
            ? secondary_tabs[1].link
            : `/${_.snakeCase(tab.label)}`,
        visible: null,
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
