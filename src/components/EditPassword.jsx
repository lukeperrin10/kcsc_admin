import React from 'react'
import { TextField, Button } from '@material-ui/core'

const EditPassword = () => {
  return (
    <>
      <TextField
        name='newPassword'
        label='New Password'
        type='password'
        variant='outlined'
        data-cy='new-password-input'
      />
      <TextField
        name='confirmPassword'
        label='Confirm Password'
        type='password'
        variant='outlined'
        data-cy='new-password-confirmation-input'
      />
      <Button data-cy='submit-btn'>Reset Password</Button>
    </>
  )
}

export default EditPassword
