import React, { useState } from 'react'
import {
  TextField,
  Grid,
  Button,
  Modal,
  Paper,
  makeStyles,
} from '@material-ui/core'
import { DropzoneArea } from 'material-ui-dropzone'
import AppData from '../../modules/AppData'
import { useForm, Controller } from 'react-hook-form'
import SubmitButton from '../SubmitButton'

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

const TestimonialsForm = ({ testimonial, index }) => {
  const [open, setOpen] = useState(false)
  const { control, handleSubmit } = useForm()
  const classes = useStyles()

  const onSubmit = (attributes, id, photo) => {
    const fromData = {
      testimonials: {
        ...attributes[`testimonials${id}`],
        id: id,
        photo: photo,
      },
    }
    AppData.update(fromData)
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
              key={`testimonial-form-${index}`}
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
                  <DropzoneArea
                    data-cy='testimonial-image'
                    acceptedFiles={['image/*']}
                    dropzoneText='Drag and drop or click here to add images'
                    filesLimit={1}
                    showPreviewsInDropzone={true}
                  />
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
