import React from 'react'
import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom'

const ProtectedRoute = ({ path, component }) => {
  const { authenticated } = useSelector((state) => state)
  return (
    <>
      <Route exact path={path} component={authenticated && component} />
    </>
  )
}

export default ProtectedRoute
