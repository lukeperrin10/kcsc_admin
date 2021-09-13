import React from 'react'
import { Route } from 'react-router-dom'

const ProtectedRoute = ({ path, component, authenticated }) => {
  return (
    <>
      <Route exact path={path} component={authenticated && component} />
    </>
  )
}

export default ProtectedRoute
