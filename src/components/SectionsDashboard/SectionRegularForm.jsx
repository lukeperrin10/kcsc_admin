import React, { useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
  TextField,
} from '@material-ui/core'
import useCommonStyles from '../../theme/useCommonStyles'
import SubmitButton from '../SubmitButton'
import { Controller, useForm } from 'react-hook-form'
import Sections from '../../modules/Sections'
import ImageUploader from '../ImageUploader'
import { CallMissedSharp } from '@material-ui/icons'

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
  const [newImage, setNewImage] = useState(image)
  const commonClasses = useCommonStyles()
  const { control, handleSubmit } = useForm()
  const descriptionMaxLength = 1500

  const onSubmit = (formData) => {
    let updatedSection = {
      ...formData,
      image: { alt: newImage.alt, image: newImage.image },
      variant: variant,
      id: id,
    }
    Sections.update(updatedSection)
    console.log(updatedSection)
  }

  const handleChange = (event) => {
    setNewImage({ ...newImage, alt: event.target.value })
  }

  const buttonForms = buttons.map((button, buttonIndex) => {
    return (
      <Grid
        item
        container
        direction='column'
        spacing={3}
        xs={6}
        style={{ padding: '1rem' }}>
        <Grid item>{`Button ${buttonIndex + 1}`}</Grid>
        <Grid item>
          <Controller
            name={`buttons[${buttonIndex}].text`}
            control={control}
            defaultValue={button.text}
            rules={{ required: 'This field cannot be empty' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                data-cy='header-input'
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
                data-cy='header-input'
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
    <form data-cy='section-edit-form' onSubmit={handleSubmit(onSubmit)}>
      <Accordion
        style={{backgroundColor: '#00000000'}}
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h6'>{`${index}) ${header}`}</Typography>
        </AccordionSummary>
        <AccordionDetails className={commonClasses.accordionDetails}>
          <Grid container direction='column' spacing={3}>
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
                    label={`description (max ${descriptionMaxLength} char.)*`}
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
            {/* <Grid item>
              <ImageUploader
                article={newImage}
                setArticle={setNewImage}
                handleChange={(event) => handleChange(event)}
              />
            </Grid> */}
            <Grid item container direction='row'>
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
