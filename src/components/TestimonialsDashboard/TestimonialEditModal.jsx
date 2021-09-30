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
  },
  photo: {
    objectFit: 'contain',
    margin: 'auto',
    maxWidth: '510px',
    minWidth: '310px',
    [theme.breakpoints.up('sm')]: {
      minWidth: '540px',
      maxWidth: '540px',
    },
  },
}))

const TestimonialsForm = ({ testimonial }) => {
  const { id, name, text, photo, alt, link } = testimonial
  const [open, setOpen] = useState(false)
  const [preview, setPreview] = useState()
  const [newPhoto, setNewPhoto] = useState(photo)
  const { control, handleSubmit } = useForm()
  const classes = useStyles()

  const onSubmit = async (attributes) => {
    const fromData = {
      testimonials: {
        ...attributes,
        id: id,
        photo: newPhoto,
      },
    }
    try {
      await AppData.update(fromData)
      setOpen(false)
    } catch {}
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
      <Button
        data-cy='edit-button'
        variant='contained'
        color='primary'
        onClick={() => setOpen(true)}>
        Edit
      </Button>
      {open && (
        <Modal open={open} style={{ overflow: 'scroll' }}>
          <Paper className={classes.testimonialContainer}>
            <Grid data-cy='testimonial-form' item container sm={12}>
              <form
                data-cy='new-article-modal'
                onSubmit={handleSubmit((attributes) => onSubmit(attributes))}>
                <Grid item container direction='column' spacing={3}>
                  <Grid item style={{ height: 'auto' }}>
                    <CardMedia
                      className={classes.photo}
                      data-cy='image-preview'
                      component='img'
                      src={preview ? URL?.createObjectURL(preview) : photo}
                    />
                  </Grid>
                  <Grid item container justifyContent='flex-end'>
                    <input
                      accept='image/*'
                      style={{ display: 'none' }}
                      id={`testimonial-image-input-section-${id}`}
                      type='file'
                      onChange={(event) => {
                        handleImage(event)
                      }}
                    />
                    <label htmlFor={`testimonial-image-input-section-${id}`}>
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
                      defaultValue={name}
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
                      defaultValue={text}
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
                      defaultValue={alt}
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
                      defaultValue={link}
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
                  <Grid item container justifyContent='space-between'>
                    <Grid item>
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={() => setOpen(false)}>
                        Close
                      </Button>
                    </Grid>
                    <Grid item>
                      <SubmitButton dataCy='testimonial-submit-button' />
                    </Grid>
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
