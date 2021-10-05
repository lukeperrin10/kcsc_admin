import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Authentication from './modules/Authentication'
import GeneralDashboard from './views/GeneralDashboard'
import AnalyticsDashboard from './views/AnalyticsDashboard'
import ArticlesDashboard from './views/ArticlesDashboard'
import ArticleCreation from './views/ArticleCreation'
import SectionsDashboard from './views/SectionsDashboard'
import InformationDashboard from './views/InformationDashboard'
import TestimonialsDashboard from './views/TestimonialsDashboard'
import InformationCreation from './views/InformationCreation'
import NavigationDashboard from './views/NavigationDashboard'
import CreateTestimonial from './views/CreateTestimonial'
import LoginPage from './views/LoginPage'
import Sidebar from './components/navigation/Sidebar'
import PhoneSidebar from './components/navigation/PhoneSidebar'
import SuccessSnackbar from './components/popups/SuccessSnackbar'
import ErrorSnackbar from './components/popups/ErrorSnackbar'
import ResetPassword from './views/ResetPassword'
import EditPassword from './views/EditPassword'
import './styles/globals.css'

const App = () => {
  const { authenticated } = useSelector((state) => state)
  const isSmall = useMediaQuery('(max-width:1280px)')

  useEffect(() => {
    Authentication.validateToken()
  }, [authenticated])

  return (
    <>
      <SuccessSnackbar />
      <ErrorSnackbar />
      {authenticated && (isSmall ? <PhoneSidebar /> : <Sidebar />)}

      {!authenticated ? (
        <Switch>
          <Route exact path='/' component={LoginPage} />
          <Route exact path='/password/reset' component={ResetPassword} />
          <Route exact path='/password/edit' component={EditPassword} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path='/' component={GeneralDashboard} />
          <Route exact path='/navigation' component={NavigationDashboard} />
          <Route exact path='/analytics' component={AnalyticsDashboard} />
          <Route exact path='/articles' component={ArticlesDashboard} />
          <Route exact path='/articles/create/' component={ArticleCreation} />
          <Route exact path='/sections' component={SectionsDashboard} />
          <Route exact path='/information' component={InformationDashboard} />
          <Route
            exact
            path='/information/create'
            component={InformationCreation}
          />
          <Route exact path='/testimonials' component={TestimonialsDashboard} />
          <Route
            exact
            path='/testimonials/create'
            component={CreateTestimonial}
          />
        </Switch>
      )}
    </>
  )
}

export default App
