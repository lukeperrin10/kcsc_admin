import { Button, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import Authentication from '../modules/Authentication'

const ResetPassword = () => {
  const [successMessage, setSuccessMessage] = useState()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const message = await Authentication.resetPassword(event)
    setSuccessMessage(message)
  }
  return (
    <>
      <form onSubmit={(event) => handleSubmit(event)}>
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
      {successMessage && (
        <Typography data-cy='success-message'>{successMessage}</Typography>
      )}
    </>
  )
}

export default ResetPassword
