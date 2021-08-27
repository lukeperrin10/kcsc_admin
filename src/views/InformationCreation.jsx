import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import {
  Box,
  Typography,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'
import Information from '../modules/Articles'
import infoCreationTheme from '../theme/articleCreationTheme'
import SuccessSnackbar from '../components/popups/SuccessSnackbar'
import useCommonStyles from '../theme/useCommonStyles'

const InformationCreation = () => {
  const commonClasses = useCommonStyles()
  const classes = infoCreationTheme()
  const [redirect, setRedirect] = useState(false)
  const [info, setInfo] = useState({
    publish: true,
    pinned: false,
    header: '',
    description: '',
    link: '',
  })
  const descriptionMaxLength = 300

  const handleChange = (event) => {
    setInfo({
      ...info,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    Information.create(info)
    setRedirect(true)
  }

  return (
    <Box className={commonClasses.viewContainer}>
      <SuccessSnackbar />
      <Box className={commonClasses.dashboardHeader}>
        <Typography
          data-cy='dashboard-header'
          variant='h5'
          style={{ fontWeight: 600 }}>
          Create a new article
        </Typography>
      </Box>
      {redirect && <Redirect to='/information' />}
      <form
        noValidate
        autoComplete='off'
        className={classes.formGroup}
        data-cy='new-article-modal'
        onSubmit={handleSubmit}>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                value={info.publish}
                onChange={handleChange}
                name='publish'
                color='primary'
              />
            }
            label='Publish'
          />
          <FormControlLabel
            control={
              <Checkbox
                value={info.pinned}
                onChange={handleChange}
                name='pinned'
                color='primary'
              />
            }
            label='Pinned'
          />
        </FormGroup>
        <TextField
          className={classes.form}
          data-cy='header'
          variant='outlined'
          fullWidth
          required
          id='standard-required'
          label='Header'
          type='string'
          name='header'
          onChange={handleChange}
        />

        <TextField
          className={classes.form}
          data-cy='description'
          variant='outlined'
          fullWidth
          required
          multiline
          label={`description (max ${descriptionMaxLength} char.)*`}
          inputProps={{ maxLength: descriptionMaxLength }}
          id='standard-required'
          type='text'
          name='description'
          onChange={handleChange}
        />
        <TextField
          className={classes.form}
          data-cy='link'
          variant='outlined'
          fullWidth
          required
          multiline
          id='standard-required'
          label='Link'
          type='text'
          name='link'
          onChange={handleChange}
        />

        <Box className={classes.btnBox}>
          <Button
            data-cy='info-submit'
            variant='contained'
            type='submit'
            color='primary'>
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default InformationCreation
