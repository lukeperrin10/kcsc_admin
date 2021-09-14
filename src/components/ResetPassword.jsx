import { Button, Container, TextField, Typography } from '@material-ui/core'
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
      <form onSubmit={(event) => handleSubmit(event)}>
        <Container className={classes.border}>
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
            data-cy='submit-btn'
            fullWidth>
            Reset Password
          </Button>
          <Button
            className={classes.button}
            component={Link}
            to='/'
            variant='contained'
            color='cancel'
            fullWidth>
            Go back
          </Button>
          {successMessage && (
            <Typography data-cy='success-message'>{successMessage}</Typography>
          )}
        </Container>
      </form>
    </Container>
  )
}

export default ResetPassword
