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

const NavigationForm = ({ navigation }) => {
  const [expanded, setExpanded] = useState({ footer: true })
  const { control, handleSubmit } = useForm()
  const commonClasses = useCommonStyles()
  const labelMaxLength = 50

  const onSubmit = ({ navigation }) => {
    let attributes = {
      navigation: navigation,
    }
    AppData.update(attributes)
  }

  const mainTabs = () => {
    return (
      <Grid item>
        <Controller
          name='main-tab'
          control={control}
          defaultValue={about}
          rules={{ required: 'This field cannot be empty' }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              data-cy='main-tab-label-input'
              variant='outlined'
              label={`About CHWL*`}
              inputProps={{ maxLength: labelMaxLength }}
              error={!!error}
              helperText={error ? error.message : null}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </Grid>
    )
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
            {mainTabs}
            <SubmitButton />
          </Grid>
        </AccordionDetails>
        
      </Accordion>
    </form>
  )
}

export default NavigationForm
