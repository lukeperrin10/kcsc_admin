import React from 'react'
import largeLogo from '../assets/LogoCHWL.png'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Authentication from '../modules/Authentication'
import { Link } from 'react-router-dom'
import { makeStyles, Hidden, CardMedia } from '@material-ui/core'
import logo from '../assets/LogoCHWLSymbol.png'

const useStyles = makeStyles((theme) => ({
  resetBtn: {
    [theme.breakpoints.up('xs')]: {
      marginTop: '20px',
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  },
  image: {
    width: '100px'
  }
}))

const LoginPage = () => {
  const classes = useStyles()
  const handleLogin = (event) => {
    event.preventDefault()
    Authentication.signIn(event.target)
  }
  return (
    <div className='login-page'>
      <img src={largeLogo} className='login-image' alt='office background' />
      <div className='login-container'>
        <Hidden smDown>
          <h1>Sign in</h1>
        </Hidden>
        <Hidden mdUp>
          <CardMedia component='img' image={logo} className={classes.image} />
        </Hidden>
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
        <Button
          className={classes.resetBtn}
          component={Link}
          data-cy='forgot-password-link'
          to='/password/reset'>
          Forgot Password?
        </Button>
      </div>
    </div>
  )
}

export default LoginPage
