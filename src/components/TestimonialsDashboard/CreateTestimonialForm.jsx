import React, { useState } from 'react'
import {
  TextField,
  Grid,
  makeStyles,
  IconButton,
  CardMedia,
} from '@material-ui/core'
import AppData from '../../modules/AppData'
import { useForm, Controller } from 'react-hook-form'
import SubmitButton from '../SubmitButton'
import { PhotoCamera } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  testimonialContainer: {
    [theme.breakpoints.up('xs')]: {
      backgroundColor: '#fff',
      margin: '50px auto',
      height: 'auto',
      maxWidth: '500px',
      border: '1px solid #eee',
      padding: '30px',
    },
  },
  photo: {
    margin: 'auto',
    maxWidth: '100%',
    objectFit: 'contain',
  },
}))

const CreateTestimonialForm = ({ newTestimonialId, setRedirect }) => {
  const [preview, setPreview] = useState()
  const [newPhoto, setNewPhoto] = useState()
  const { control, handleSubmit } = useForm()
  const classes = useStyles()

  const onSubmit = (attributes) => {
    const fromData = {
      testimonials: {
        ...attributes,
        id: newTestimonialId,
        photo: newPhoto,
      },
    }
    AppData.update(fromData)
    setRedirect(true)
  }

  const imageEncoder = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  const handleImage = async (event) => {
    let file = event.target.files[0]
    setPreview(file)
    let encodedFile = await imageEncoder(file)
    setNewPhoto(encodedFile)
  }

  const testimonialsForm = (
    <>
      <Grid
        data-cy='create-testimonial-form'
        container      
        justifyContent='center'
        className={classes.testimonialContainer}>
        <form
          data-cy='new-article-modal'
          onSubmit={handleSubmit((attributes) => onSubmit(attributes))}
          style={{ width: '100%' }}>
          <Grid item container direction='column' spacing={3}>
            <Grid item style={{ height: 'auto' }}>
              <CardMedia
                className={classes.photo}
                data-cy='image-preview'
                component='img'
                src={preview ? URL?.createObjectURL(preview) : undefined}
              />
            </Grid>
            <Grid item container justifyContent='flex-end'>
              <input
                accept='image/*'
                style={{ display: 'none' }}
                id={`testimonial-image-input-section-${newTestimonialId}`}
                type='file'
                onChange={(event) => {
                  handleImage(event)
                }}
              />
              <label
                htmlFor={`testimonial-image-input-section-${newTestimonialId}`}>
                <IconButton
                  data-cy='image-upload-button'
                  component='span'
                  color='primary'>
                  <PhotoCamera />
                </IconButton>
              </label>
            </Grid>
            <Grid item>
              <Controller
                name='name'
                control={control}
                rules={{ required: 'This field cannot be empty' }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    data-cy='testimonial-name'
                    variant='outlined'
                    label='Name*'
                    fullWidth
                    inputProps={{ maxLength: 50 }}
                    error={!!error}
                    helperText={error ? error.message : null}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name='text'
                control={control}
                rules={{ required: 'This field cannot be empty' }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    data-cy='testimonial-text'
                    variant='outlined'
                    label='Testimonial Text (max 500 char.)*'
                    fullWidth
                    multiline
                    minRows={4}
                    inputProps={{ maxLength: 500 }}
                    error={!!error}
                    helperText={error ? error.message : null}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name='alt'
                control={control}
                rules={{ required: 'This field cannot be empty' }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    data-cy='testimonial-alt'
                    variant='outlined'
                    label='Alt (describe uploaded image max 50 char.)*'
                    fullWidth
                    inputProps={{ maxLength: 50 }}
                    error={!!error}
                    helperText={error ? error.message : null}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name='link'
                control={control}
                rules={{ required: 'This field cannot be empty' }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    data-cy='testimonial-link'
                    variant='outlined'
                    label='Link to Full Article*'
                    fullWidth
                    error={!!error}
                    helperText={error ? error.message : null}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </Grid>
            <Grid item container justifyContent='center'>
              <Grid item>
                <SubmitButton dataCy='testimonial-submit-button' />
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </>
  )

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item container direction='row' spacing={3}>
        {testimonialsForm}
      </Grid>
    </Grid>
  )
}

export default CreateTestimonialForm
