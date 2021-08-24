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
  Button,
} from '@material-ui/core'
import useCommonStyles from '../../theme/useCommonStyles'
import AppData from '../../modules/AppData'
import SubmitButton from './SubmitButton'

const FooterForm = ({ about, disclaimers }) => {
  const [expanded, setExpanded] = useState({ footer: true })
  const { control, handleSubmit } = useForm()
  const commonClasses = useCommonStyles()
  const aboutMaxLength = 200
  const copyrightMaxLength = 80
  const accessabilityMaxLength = 80

  const onSubmit = ({ about, copyright, accessability }) => {
    let attributes = {
      about: about,
      disclaimers: {
        copyright: copyright,
        accessability: accessability,
      },
    }
    AppData.update(attributes)
  }

  return (
    <form data-cy='footer-form' onSubmit={handleSubmit(onSubmit)}>
      <Accordion
        expanded={expanded.footer}
        onChange={() => setExpanded({ ...expanded, footer: !expanded.footer })}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h6'>Footer</Typography>
        </AccordionSummary>
        <AccordionDetails className={commonClasses.accordionDetails}>
          <Grid container direction='column' spacing={3}>
            <Grid item>
              <Controller
                name='about'
                control={control}
                defaultValue={about}
                rules={{ required: 'About CHWL cannot be empty' }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    data-cy='about-field'
                    variant='outlined'
                    fullWidth
                    label={`About CHWL (max ${aboutMaxLength} char.)*`}
                    multiline
                    minRows={2}
                    maxRows={6}
                    inputProps={{ maxLength: aboutMaxLength }}
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
                name='copyright'
                control={control}
                defaultValue={disclaimers && disclaimers.copyright}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    data-cy='copyright-field'
                    variant='outlined'
                    fullWidth
                    label={`Copyright disclaimer (max ${copyrightMaxLength} char.)`}
                    inputProps={{ maxLength: copyrightMaxLength }}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name='accessability'
                control={control}
                defaultValue={disclaimers && disclaimers.accessability}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    data-cy='accessability-field'
                    variant='outlined'
                    fullWidth
                    label={`Accessability disclaimer (max ${accessabilityMaxLength} char.)`}
                    inputProps={{ maxLength: accessabilityMaxLength }}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </Grid>
            <SubmitButton />
          </Grid>
        </AccordionDetails>
      </Accordion>
    </form>
  )
}

export default FooterForm
