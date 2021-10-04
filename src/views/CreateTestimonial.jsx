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
  const [uniqueId, setUniqueId] = useState()
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    AppData.index()
  }, [])

  useEffect(() => {
    if (testimonials && !uniqueId) {
      const testimonialIds = testimonials.map((testimonial) => {
        return testimonial.id
      })
      const newId = Math.max(...testimonialIds) + 1
      setUniqueId(newId)
    }
  }, [testimonials, uniqueId])

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
      <CreateTestimonialForm
        newTestimonialId={uniqueId}
        setRedirect={setRedirect}
      />
    </Box>
  )
}

export default CreateTestimonial
