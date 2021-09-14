import { makeStyles } from "@material-ui/core";

const resetPasswordTheme = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up('xs')]: {
      display: 'grid',
      alignItems: 'center',
      backgroundColor: '#fff',
      margin: 'auto',
      width: '100%',
      height: '100vh',
      padding: '0px 100px',
    },
    [theme.breakpoints.up('sm')]: {},
  },
  border: {
    [theme.breakpoints.up('xs')]: {
      display: 'grid',
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
  form: {
    [theme.breakpoints.up('xs')]: {
      paddingBottom: '20px',
    },
  },
  input: {
    [theme.breakpoints.up('xs')]: {
      width: '300px',
    },
  },
  button: {
    [theme.breakpoints.up('xs')]: {
      marginLeft: '10px',
      padding: '11px',
    },
  },
}))

export default resetPasswordTheme