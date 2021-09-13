import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
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
import LoginPage from './components/LoginPage'
import Sidebar from './components/navigation/Sidebar'
import PhoneSidebar from './components/navigation/PhoneSidebar'
import SuccessSnackbar from './components/popups/SuccessSnackbar'
import ErrorSnackbar from './components/popups/ErrorSnackbar'
import ResetPassword from './components/ResetPassword'
import ProtectedRoute from './components/ProtectedRoute'
import EditPassword from './components/EditPassword'
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
      {authenticated && <Redirect to='/general' />}
      {authenticated && (isSmall ? <PhoneSidebar /> : <Sidebar />)}
      <Switch>
        <ProtectedRoute
          path='/general'
          component={GeneralDashboard}
          authenticated={authenticated}
        />
        <ProtectedRoute
          path='/navigation'
          component={NavigationDashboard}
          authenticated={authenticated}
        />
        <ProtectedRoute
          path='/analytics'
          component={AnalyticsDashboard}
          authenticated={authenticated}
        />
        <ProtectedRoute
          path='/articles'
          component={ArticlesDashboard}
          authenticated={authenticated}
        />
        <ProtectedRoute
          path='/articles/create'
          component={ArticleCreation}
          authenticated={authenticated}
        />
        <ProtectedRoute
          path='/sections'
          component={SectionsDashboard}
          authenticated={authenticated}
        />
        <ProtectedRoute
          path='/information'
          component={InformationDashboard}
          authenticated={authenticated}
        />
        <ProtectedRoute
          path='/information/create'
          component={InformationCreation}
          authenticated={authenticated}
        />
        <ProtectedRoute
          path='/testimonials'
          component={TestimonialsDashboard}
          authenticated={authenticated}
        />
        <ProtectedRoute
          path='/testimonials/create'
          component={CreateTestimonial}
          authenticated={authenticated}
        />
        <Route exact path='/' component={LoginPage} />
        <Route exact path='/password/reset' component={ResetPassword} />
        <Route exact path='/password/edit' component={EditPassword} />
      </Switch>
    </>
  )
}

export default App
