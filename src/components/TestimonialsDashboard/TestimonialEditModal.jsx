import React, { useState } from 'react'
import {
  TextField,
  Grid,
  Button,
  Modal,
  Paper,
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
      margin: 'auto',
      maxWidth: '600px',
      padding: '30px',
    },
    [theme.breakpoints.up('sm')]: {
      padding: '30px',
    },
  },
}))

const TestimonialsForm = ({ testimonial }) => {
  const { id, name, text, photo, alt, link } = testimonial
  const [open, setOpen] = useState(false)
  const [preview, setPreview] = useState()
  const [newPhoto, setNewPhoto] = useState(testimonial.photo)
  const { control, handleSubmit } = useForm()
  const classes = useStyles()

  const onSubmit = (attributes, id, photo) => {
    // newPhoto goes here
    const fromData = {
      testimonials: {
        ...attributes[`testimonials${id}`],
        id: id,
        photo: photo,
      },
    }
    AppData.update(fromData)
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
      <Button variant='contained' color='primary' onClick={() => setOpen(true)}>
        Edit
      </Button>
      {open && (
        <Modal
          open={open}
          style={{ overflow: 'scroll' }}
          onClose={() => setOpen(false)}>
          <Paper className={classes.testimonialContainer}>
            <Grid
              key={`testimonial-form-${id}`}
              data-cy='testimonial-form'
              item
              container
              sm={12}>
              <form
                data-cy='new-article-modal'
                onSubmit={handleSubmit((attributes) =>
                  onSubmit(attributes, testimonial.id, testimonial.photo)
                )}>
                <Grid item container direction='column' spacing={3}>
                  <Grid item container style={{ height: '250px' }}>
                    <CardMedia
                      className={classes.logo}
                      data-cy='image-preview'
                      component='img'
                      src={preview ? URL?.createObjectURL(preview) : photo}
                    />
                  </Grid>
                  <Grid item container justifyContent='flex-end'>
                    <input
                      accept='image/*'
                      style={{ display: 'none' }}
                      id={`card-image-input-section-${id}`}
                      type='file'
                      onChange={(event) => {
                        handleImage(event)
                      }}
                    />
                    <label htmlFor={`card-image-input-section-${id}`}>
                      <IconButton
                        data-cy='image-upload-button'
                        component='span'>
                        <PhotoCamera />
                      </IconButton>
                    </label>
                  </Grid>

                  <Grid item>
                    <Controller
                      name={`testimonials${testimonial.id}.name`}
                      control={control}
                      defaultValue={testimonial.name}
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
                      name={`testimonials${testimonial.id}.text`}
                      control={control}
                      defaultValue={testimonial.text}
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
                          minRows={8}
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
                      name={`testimonials${testimonial.id}.alt`}
                      control={control}
                      defaultValue={testimonial.alt}
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
                      name={`testimonials${testimonial.id}.link`}
                      control={control}
                      defaultValue={testimonial.link}
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
                  <Grid item>
                    <SubmitButton dataCy='testimonial-submit-button' />
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Paper>
        </Modal>
      )}
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

export default TestimonialsForm
