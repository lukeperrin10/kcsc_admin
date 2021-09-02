import React, { useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Controller, useForm } from 'react-hook-form'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Grid,
} from '@material-ui/core'
import useCommonStyles from '../../theme/useCommonStyles'
import AppData from '../../modules/AppData'
import SubmitButton from '../SubmitButton'

const TaglineForm = (tagline) => {
  const [expanded, setExpanded] = useState(true)
  const { control, handleSubmit } = useForm()
  const commonClasses = useCommonStyles()

  const onSubmit = (formData) => {
    AppData.update(formData)
  }

  return (
    <form data-cy='tagline-form' onSubmit={handleSubmit(onSubmit)} >
      <Accordion
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h6'>Tagline</Typography>
        </AccordionSummary>
        <AccordionDetails className={commonClasses.accordionDetails} style={{width: '50%'}}>
          <Grid container direction='column' spacing={3}>
            <Grid item>
              <Controller
                name='tagline'
                control={control}
                defaultValue={tagline}
                rules={{ required: 'About CHWL cannot be empty' }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    data-cy='tagline-field'
                    variant='outlined'
                    fullWidth
                    label={`Home page tagline (max 200 char.)*`}
                    multiline
                    minRows={2}
                    maxRows={6}
                    inputProps={{ maxLength: 200 }}
                    error={!!error}
                    helperText={error ? error.message : null}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </Grid>          
            <SubmitButton dataCy='tagline-submit-button' />
          </Grid>
        </AccordionDetails>
      </Accordion>
    </form>
  )
}

export default TaglineForm
