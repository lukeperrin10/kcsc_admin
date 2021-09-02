import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import store from './state/store/configureStore'
import Authentication from './modules/Authentication'
import GeneralDashboard from './views/GeneralDashboard'
import AnalyticsDashboard from './views/AnalyticsDashboard'
import ArticlesDashboard from './views/ArticlesDashboard'
import ArticleCreation from './views/ArticleCreation'
import SectionsDashboard from './views/SectionsDashboard'
import InformationDashboard from './views/InformationDashboard'
import TestimonialsDashboard from './views/TestimonialsDashboard'
import InformationCreation from './views/InformationCreation'
import LoginPage from './components/LoginPage'
import Sidebar from './components/navigation/Sidebar'
import PhoneSidebar from './components/navigation/PhoneSidebar'
import SuccessSnackbar from './components/popups/SuccessSnackbar'
import ErrorSnackbar from './components/popups/ErrorSnackbar'
import './styles/globals.css'

const App = () => {
  const { authenticated } = useSelector((state) => state)
  const isSmall = useMediaQuery('(max-width:1280px)')

  useEffect(() => {
    Authentication.validateToken()
    if (window.Cypress) {
      store.dispatch({
        type: 'AUTHENTICATE',
        payload: 'Johnny Cage',
      })
    }
  }, [authenticated])

  return (
    <>
      <SuccessSnackbar />
      <ErrorSnackbar />
      {authenticated ? (
        <>
          {isSmall ? <PhoneSidebar /> : <Sidebar />}
          <Switch>
            <Route exact path='/' component={GeneralDashboard} />
            <Route exact path='/analytics' component={AnalyticsDashboard} />
            <Route exact path='/articles' component={ArticlesDashboard} />
            <Route exact path='/articles/create' component={ArticleCreation} />
            <Route exact path='/sections' component={SectionsDashboard} />
            <Route exact path='/information' component={InformationDashboard} />
            <Route
              exact
              path='/information/create'
              component={InformationCreation}
            />
            <Route exact path='/testimonials' component={TestimonialsDashboard} />
          </Switch>
        </>
      ) : (
        <LoginPage />
      )}
    </>
  )
}

export default App
