import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import './styles/globals.css'
import Sidebar from './components/Sidebar'
import GeneralDashboard from './views/GeneralDashboard'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import PhoneSidebar from './components/PhoneSidebar'
import LoginPage from './components/LoginPage'
import ErrorSnackbar from './components/ErrorSnackbar'
//import Authentication from './modules/Authentication'
import { Route, Switch } from 'react-router-dom'
import AnalyticsDashboard from './views/AnalyticsDashboard'
import ArticlesDashboard from './views/ArticlesDashboard'
import SuccessSnackbar from './components/SuccessSnackbar'
import store from './state/store/configureStore'

const App = () => {
  const { authenticated } = useSelector((state) => state)
  const isSmall = useMediaQuery('(max-width:1280px)')

  useEffect(() => {
    //Authentication.validateToken()
    // Following will automatically authenticate on localhost while API is not up
    store.dispatch({
      type: 'AUTHENTICATE',
      payload: 'Johnny Cage',
    })
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
          </Switch>
        </>
      ) : (
        <LoginPage />
      )}
    </>
  )
}

export default App
