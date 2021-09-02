import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import useCommonStyles from '../theme/useCommonStyles'
import NavigationForm from '../components/NavigationForm'
import AppData from '../modules/AppData'

const NavigationDashboard = () => {
  const commonClasses = useCommonStyles()
  const app_data = useSelector((state) => state.app_data)

  useEffect(() => {
    AppData.index()
  }, [])

  return (
    <Box className={commonClasses.viewContainer}>
      <Box className={commonClasses.dashboardHeader}>
        <Typography
          data-cy='dashboard-header'
          variant='h5'
          style={{ fontWeight: 600 }}>
          Site Navigation
        </Typography>
      </Box>
       <NavigationForm tabs={app_data.navigation} /> 
    </Box>
  )
}

export default NavigationDashboard
