import React from 'react'
import largeLogo from '../assets/LogoCHWL.png'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Authentication from '../modules/Authentication'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  const handleLogin = (event) => {
    event.preventDefault()
    Authentication.signIn(event.target)
  }
  return (
    <div className='login-page'>
      <img src={largeLogo} className='login-image' alt='office background' />
      <div className='login-container'>
        <h1>Sign in</h1>
        <form onSubmit={handleLogin} className='form-container'>
          <TextField
            name='email'
            label='Email'
            type='email'
            variant='outlined'
            data-cy='email-field'
          />
          <TextField
            name='password'
            label='Password'
            type='password'
            variant='outlined'
            data-cy='password-field'
          />
          <Button
            type='submit'
            variant='outlined'
            color='primary'
            data-cy='login-btn'>
            Login
          </Button>
        </form>
        <Button component={Link} data-cy='forgot-password-link' to='/password/reset'>
          <Typography>Forgot Password?</Typography>
        </Button>
      </div>
    </div>
  )
}

export default LoginPage
