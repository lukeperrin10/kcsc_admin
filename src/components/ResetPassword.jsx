import { Button, TextField } from '@material-ui/core'
import React from 'react'

const ResetPassword = () => {
  return (
    <div>
      <TextField
        name='email'
        label='Email'
        type='email'
        variant='outlined'
        data-cy='email-input'
      />
      <Button data-cy='submit-btn'>Reset Password</Button>
    </div>
  )
}

export default ResetPassword
