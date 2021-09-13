import { Button, TextField } from '@material-ui/core'
import React from 'react'
import Authentication from '../modules/Authentication'

const ResetPassword = () => {
  const handleClick = (event) => {
    event.preventDefault()
    Authentication.forgotPassword(event)
  }
  return (
    <>
      <form onSubmit={(event) => handleClick(event)}>
        <TextField
          name='email'
          label='Email'
          type='email'
          variant='outlined'
          data-cy='email-input'
        />
        <Button type='submit' data-cy='submit-btn'>
          Reset Password
        </Button>
      </form>
    </>
  )
}

export default ResetPassword
