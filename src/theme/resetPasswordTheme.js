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
      padding: '0px 10%',
    },
    [theme.breakpoints.up('sm')]: {
      padding: '0px 100px',
    },
  },
  image: {
    [theme.breakpoints.up('xs')]: {
      width: '200px',
      margin: 'auto',
      paddingBottom: '50px',
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
    [theme.breakpoints.up('md')]: {
      width: '50%',
    },
  },
  input: {
    [theme.breakpoints.up('xs')]: {
      width: '275px',
      marginTop: '20px',
    },
    [theme.breakpoints.up('sm')]: {
      width: '300px',
      marginTop: '20px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '350px',
      marginTop: '20px',
    },
  },
  button: {
    [theme.breakpoints.up('xs')]: {
      width: '275px',
      marginTop: '20px',
      padding: '11px',
    },
    [theme.breakpoints.up('sm')]: {
      width: '300px',
      marginTop: '20px',
      padding: '11px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '350px',
      marginTop: '20px',
      padding: '11px',
    },
  },
  message: {
    [theme.breakpoints.up('xs')]: {
      width: '275px',
      marginTop: '20px',
    },
    [theme.breakpoints.up('sm')]: {
      width: '300px',
      marginTop: '20px',
    },
    [theme.breakpoints.up('md')]: {
      width: '350px',
      marginTop: '20px',
    },
  },
}))

export default resetPasswordTheme
