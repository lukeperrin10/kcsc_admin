import { makeStyles } from '@material-ui/core'

const resetPasswordTheme = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up('xs')]: {
      display: 'grid',
      alignItems: 'center',
      backgroundColor: '#fff',
      margin: 'auto',
      width: '100%',
      height: '100vh',
      padding: '0px 50px',
    },
    [theme.breakpoints.up('sm')]: {
      padding: '0px 100px',
    },
  },
  border: {
    [theme.breakpoints.up('xs')]: {
      display: 'grid',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      justifyItems: 'center',
      border: 'solid 3px #E86406',
      borderRadius: '5px',
      width: '100%',
      height: '400px',
    },
    
  },
  input: {
    [theme.breakpoints.up('xs')]: {
      maxWidth: '300px',
      marginTop: '20px',
    },
  },
  button: {
    [theme.breakpoints.up('xs')]: {
      maxWidth: '300px',
      marginTop: '20px',
      padding: '11px',
    },
  },
}))

export default resetPasswordTheme
