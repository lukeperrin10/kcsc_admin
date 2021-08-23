import React, { useState } from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Grid,
  Button,
  Divider,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import useCommonStyles from '../theme/useCommonStyles'
import app_data from '../data/add_data.json'
import { useForm, Controller } from 'react-hook-form'

const aboutMaxLength = 200
const copyrightMaxLength = 80
const accessabilityMaxLength = 80

const GeneralDashboard = () => {
  const commonClasses = useCommonStyles()
  const appData = app_data.app_data
  const [expanded, setExpanded] = useState({ footer: true })
  const { control, handleSubmit } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <>
      <form
        className={commonClasses.viewContainer}
        onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          className={commonClasses.formControls}
          direction='row'
          alignItems='center'
          justify='space-between'>
          <Typography variant='h5'>Edit General App Info</Typography>
          <Button type='submit' variant='contained' color='primary'>
            Submit
          </Button>          
        </Grid>
        <Divider/>

        <Accordion
          expanded={expanded.footer}
          onChange={() =>
            setExpanded({ ...expanded, footer: !expanded.footer })
          }>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant='h6'>Footer</Typography>
          </AccordionSummary>
          <AccordionDetails className={commonClasses.accordionDetails}>
            <Grid container direction='column' spacing={3}>
              <Grid item>
                <Controller
                  name='about'
                  control={control}
                  defaultValue={appData.about}
                  rules={{ required: 'About CHWL cannot be empty' }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      variant='outlined'
                      fullWidth
                      label={`About CHWL (max ${aboutMaxLength} char.)*`}
                      multiline
                      rows={2}
                      rowsMax={6}
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
                  defaultValue={appData.disclamers.copyright}
                  render={({ field: { onChange, value } }) => (
                    <TextField
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
                  defaultValue={appData.disclamers.accessability}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      variant='outlined'
                      fullWidth
                      label={`About CHWL (max ${accessabilityMaxLength} char.)`}
                      inputProps={{ maxLength: accessabilityMaxLength }}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </form>
    </>
  )
}

export default GeneralDashboard
