import React, { useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
  TextField,
  CardMedia,
  makeStyles,
  IconButton,
} from '@material-ui/core'
import useCommonStyles from '../../theme/useCommonStyles'
import SubmitButton from '../SubmitButton'
import { Controller, useForm } from 'react-hook-form'
import Sections from '../../modules/Sections'
import { PhotoCamera } from '@material-ui/icons'

const useStyles = makeStyles(() => ({
  input: {
    display: 'none',
  },
  image: {
    margin: '10px 0 50px 0',
    maxHeight: '500px',
    maxWidth: '500px',
  },

  imageEdit: {
    marginBottom: '10px',
  },
  form: {
    width: '70%',
    margin: '2% 2% 5% 2%',
  },

  formEdit: {
    width: '90%',
    margin: '1% 1% 3% 2%',
  },

  uploadBtn: {
    marginBottom: '50px',
  },
  camera: {
    marginBottom: '20px',
  },
}))

const SectionRegularForm = ({
  id,
  variant,
  header,
  image,
  buttons,
  description,
  index,
}) => {
  const [expanded, setExpanded] = useState(true)
  const classes = useStyles()
  const commonClasses = useCommonStyles()
  const { control, handleSubmit } = useForm()
  const descriptionMaxLength = 500
  const [preview, setPreview] = useState('')
  const [newImage, setNewImage] = useState({ ...image, image: null })
  const [updatedImage, setUpdatedImage] = useState(false)

  const onSubmit = (formData) => {
    let updatedSection = {
      ...formData,
      image: { alt: newImage.alt, image: newImage.image },
      variant: variant,
      id: id,
    }
    Sections.update(updatedSection)
  }

  const imageEncoder = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  const handleChange = (event) => {
    setNewImage({ ...newImage, alt: event.target.value })
  }

  const handleImage = async (event) => {
    let file = event.target.files[0]
    setPreview(file)
    let encodedFile = await imageEncoder(file)
    setNewImage({
      ...newImage,
      image: encodedFile,
    })
    setUpdatedImage(true)
  }

  const buttonForms = buttons.map((button, buttonIndex) => {
    return (
      <Grid
        data-cy='button-form'
        key={`button-${buttonIndex}`}
        item
        container
        direction='column'
        spacing={3}>
        <Grid item>{`Button ${buttonIndex + 1}`}</Grid>
        <Grid item>
          <Controller
            name={`buttons[${buttonIndex}].text`}
            control={control}
            defaultValue={button.text}
            rules={{ required: 'This field cannot be empty' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                data-cy='text-input'
                variant='outlined'
                label={`Text*`}
                error={!!error}
                fullWidth
                helperText={error ? error.message : null}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            name={`buttons[${buttonIndex}].link`}
            control={control}
            defaultValue={button.link}
            rules={{ required: 'This field cannot be empty' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                data-cy='link-input'
                variant='outlined'
                label={`Link*`}
                error={!!error}
                fullWidth
                helperText={error ? error.message : null}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </Grid>
      </Grid>
    )
  })

  return (
    <form id={id} data-cy='section-edit-form' onSubmit={handleSubmit(onSubmit)}>
      <Accordion
        style={{ backgroundColor: '#00000000' }}
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h6'>{`${index}) ${header}`}</Typography>
        </AccordionSummary>
        <AccordionDetails className={commonClasses.accordionDetails}>
          <Grid container direction='row' spacing={3}>
            <Grid item container direction='column' spacing={3} xs={12} md={6}>
              <Grid item>{`Section Info:`}</Grid>
              <Grid item>
                <Controller
                  name='header'
                  control={control}
                  defaultValue={header}
                  rules={{ required: 'This field cannot be empty' }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      data-cy='header-input'
                      variant='outlined'
                      label={`Section Header`}
                      error={!!error}
                      fullWidth
                      helperText={error ? error.message : null}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  name='description'
                  control={control}
                  defaultValue={description}
                  rules={{ required: 'This field cannot be empty' }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      data-cy='description-input'
                      variant='outlined'
                      multiline
                      minRows={3}
                      label={`Section description (max ${descriptionMaxLength} char.)*`}
                      inputProps={{ maxLength: descriptionMaxLength }}
                      error={!!error}
                      fullWidth
                      helperText={error ? error.message : null}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <CardMedia
                  className={commonClasses.formImage}
                  data-cy='image-preview'
                  component='img'
                  src={preview ? URL?.createObjectURL(preview) : image.url}
                />
                <TextField
                  className={classes.formEdit}
                  data-cy='alt-input'
                  fullWidth
                  multiline
                  id='standard-required'
                  placeholder='Enter descriptive text of new image'
                  type='text'
                  name='alt'
                  defaultValue={image.alt}
                  onChange={handleChange}
                  helperText={
                    updatedImage &&
                    'Please make sure to update the alternative text for the image!'
                  }
                />

                <input
                  accept='image/*'
                  className={classes.input}
                  id={`image-input-section-${id}`}
                  type='file'
                  onChange={(event) => {
                    handleImage(event)
                  }}
                />
                <label htmlFor={`image-input-section-${id}`}>
                  <IconButton
                    data-cy='image-upload-button'
                    color='primary'
                    component='span'
                    className={classes.camera}>
                    <PhotoCamera />
                  </IconButton>
                </label>
              </Grid>
            </Grid>
            <Grid
              data-cy='buttons-grid'
              item
              container
              direction='column'
              spacing={3}
              xs={12}
              md={6}>
              {buttonForms}
            </Grid>
            <SubmitButton dataCy='section-submit-button' />
          </Grid>
        </AccordionDetails>
      </Accordion>
    </form>
  )
}

export default SectionRegularForm
