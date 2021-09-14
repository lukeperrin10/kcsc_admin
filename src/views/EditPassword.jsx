import React from 'react'
import { TextField, Button, Container, CardMedia } from '@material-ui/core'
import resetPasswordTheme from '../theme/resetPasswordTheme'
import logo from '../assets/LogoCHWLSymbol.png'
import { useParams, Redirect } from 'react-router-dom'
import Authentication from '../modules/Authentication'

const EditPassword = () => {
  const classes = resetPasswordTheme()
  const deviseParams = useParams()
  const [success, setSuccess] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const newPassword = event.target.newPassword.value
    const confirmPassword = event.target.confirmPassword.value
    const success = await Authentication.updatePassword(
      newPassword,
      confirmPassword,
      deviseParams
    )
    setSuccess(success)
  }

  return (
    <>
    {success && <Redirect to='/'/>}
    <Container className={classes.container}>
      <form onSubmit={(event) => handleSubmit(event)}>
        <CardMedia component='img' image={logo} className={classes.image} />
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
    </>
  )
}

export default EditPassword
