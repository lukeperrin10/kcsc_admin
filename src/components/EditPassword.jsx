import React from 'react'
import { TextField, Button, Container } from '@material-ui/core'
import resetPasswordTheme from '../theme/resetPasswordTheme'

const EditPassword = () => {
  const classes = resetPasswordTheme()
  return (
    <Container className={classes.container}>
      <form>
        <Container className={classes.border}>
          <TextField
            className={classes.input}
            name='newPassword'
            label='New Password'
            type='password'
            variant='outlined'
            data-cy='new-password-input'
          />
          <TextField
            className={classes.input}
            name='confirmPassword'
            label='Confirm Password'
            type='password'
            variant='outlined'
            data-cy='new-password-confirmation-input'
          />
          <Button
            className={classes.button}
            data-cy='submit-btn'
            variant='contained'
            color='primary'
            type='submit'
            fullWidth>
            Reset Password
          </Button>
        </Container>
      </form>
    </Container>
  )
}

export default EditPassword
