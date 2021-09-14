import {
  Button,
  Container,
  TextField,
  Typography,
} from '@material-ui/core'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Authentication from '../modules/Authentication'
import resetPasswordTheme from '../theme/resetPasswordTheme'


const ResetPassword = () => {
  const classes = resetPasswordTheme()
  const [successMessage, setSuccessMessage] = useState()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const message = await Authentication.resetPassword(event)
    setSuccessMessage(message)
  }
  return (
    <Container className={classes.container}>
      <Container className={classes.border}>
        <form
          onSubmit={(event) => handleSubmit(event)}
          className={classes.form}>
          <TextField
            className={classes.input}
            name='email'
            label='Enter Email'
            type='email'
            variant='outlined'
            data-cy='email-input'
          />
          <Button
            className={classes.button}
            type='submit'
            variant='contained'
            color='primary'
            data-cy='submit-btn'>
            Reset Password
          </Button>
          <Button
            className={classes.button}
            component={Link}
            to='/'
            variant='contained'
            color='cancel'
            data-cy='submit-btn'>
            Go back
          </Button>
        </form>
        {successMessage && (
          <Typography data-cy='success-message'>{successMessage}</Typography>
        )}
      </Container>
    </Container>
  )
}

export default ResetPassword
