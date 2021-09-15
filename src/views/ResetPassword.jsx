import { Button, CardMedia, Container, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Authentication from '../modules/Authentication'
import resetPasswordTheme from '../theme/resetPasswordTheme'
import logo from '../assets/LogoCHWLSymbol.png'

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
      <CardMedia component='img' image={logo} className={classes.image}/>
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
            data-cy='submit-btn'>
            Reset Password
          </Button>
          <Button
            className={classes.button}
            component={Link}
            to='/'
            variant='contained'
            color='default'>
            Go back
          </Button>
          {successMessage && (
            <Typography data-cy='success-message' className={classes.message}>Instructions has been sent to your inbox</Typography>
          )}
        </Container>
      </form>
    </Container>
  )
}

export default ResetPassword
