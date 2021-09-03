import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import AppData from '../modules/AppData'
import useCommonStyles from '../theme/useCommonStyles'
import SuccessSnackbar from '../components/popups/SuccessSnackbar'
import CreateTestimonialForm from '../components/TestimonialsDashboard/CreateTestimonialForm'
const CreateTestimonial = () => {
  const commonClasses = useCommonStyles()
  const testimonials = useSelector((state) => state.app_data?.testimonials)
  const [id, setId] = useState(null)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    AppData.index()
    if (testimonials) {
      const testimonialIds = testimonials.map((testimonial) => {
        return testimonial.id
      })
      let uniqueId = Math.max(...testimonialIds) + 1
      setId(uniqueId)
    }
  }, [testimonials])

  return (
    <Box className={commonClasses.viewContainer}>
      <SuccessSnackbar />
      <Box className={commonClasses.dashboardHeader}>
        <Typography
          data-cy='dashboard-header'
          variant='h5'
          style={{ fontWeight: 600 }}>
          Create a new testimonial
        </Typography>
      </Box>
      {redirect && <Redirect to='/testimonials' />}
      <CreateTestimonialForm id={id} setRedirect={setRedirect}/>
    </Box>
  )
}

export default CreateTestimonial
