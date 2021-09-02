import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Typography, Divider, Box } from '@material-ui/core'
import useCommonStyles from '../theme/useCommonStyles'
// import appData from '../data/app_data.json'
import TestimonialsForm from '../components/TestimonialsDashboard/TestimonialsForm'
import AppData from '../modules/AppData'

const GeneralDashboard = () => {
  const commonClasses = useCommonStyles()
  const app_data = useSelector((state) => state.app_data)
  // Use that on localhost
  // const app_data = appData.app_data

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
          Edit Testimonials Info
        </Typography>
      </Box>
      <Divider />
      {app_data ? (
        <>
          <TestimonialsForm testimonials={app_data.testimonials} />         
        </>
      ) : (
        <Typography
          data-cy='form-loading-error-message'
          variant='h6'
          style={{ padding: '1rem 2rem' }}>
          There is a problem loading a form. Please check your connection or try
          again later. If the problem persist contact the development team.
        </Typography>
      )}
    </Box>
  )
}

export default GeneralDashboard
