import axios from 'axios'
import errorHandler from './ErrorHandler'

const Sections = {
  async index(tabValue) {
    const getSection = {
      0: 'services',
      1: 'about_us',
      2: 'about_self_care',
      3: 'news',
      4: 'information',
    }

    try {  
      const response = await axios.get(
        `/sections?view=${getSection[tabValue]}`
      )      
      return response.data.sections
    } catch (error) {
      errorHandler(error)
    }
  },
}

export default Sections
