import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const CreateTestimonial = () => {
  const testimonials = useSelector((state) => state.app_data?.testimonials)
  const [id, setIds] = useState([])

  useEffect(() => {
    AppData.index()
    const testimonialIds = testimonials.map((testimonial) => {
      return testimonial.id
    })
    id = Math.max(...testimonialIds)
    setId(id + 1)
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
      <CreateTestimonialForm />
    </Box>
  )
}

export default CreateTestimonial
