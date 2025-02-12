import axios from 'axios'
import errorHandler from './ErrorHandler'
import about_self_care_view_sections from '../data/fixtures/sections/about_self_care_view_sections.json'
import about_us_view_sections from '../data/fixtures/sections/about_us_view_sections.json'
import services_view_sections from '../data/fixtures/sections/services_view_sections.json'
import information_view_sections from '../data/fixtures/sections/information_view_sections.json'
import store from '../state/store/configureStore'
import { getHeaders } from './Authentication'

const headers = getHeaders()

const Sections = {
  async index(tabValue) {
    try {
      if (window.Cypress) {
        let getSection = {
          0: 'services',
          1: 'about_us',
          2: 'about_self_care',
          3: 'information',
        }
        const response = await axios.get(
          `/api/sections?view=${getSection[tabValue]}`
        )
        return response.data.sections
      } else {
        let getSections = {
          0: services_view_sections.sections,
          1: about_us_view_sections.sections,
          2: about_self_care_view_sections.sections,
          3: information_view_sections.sections,
        }
        return getSections[tabValue]
      }
    } catch (error) {
      errorHandler(error)
    }
  },
  async update(section) {
    try {
      let response = {}
      response = await axios.put(
        `/api/sections/${section.id}`,
        { params: section },
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
}

export default Sections
