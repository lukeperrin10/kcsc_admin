import { makeStyles } from '@material-ui/core'

const articleCreationTheme = makeStyles((theme) => ({
  formGroup: {
    [theme.breakpoints.up('xs')]: {
      margin: '10vh 10vw',
      padding: '40px',
      height: '100%',
      width: '80%',
      backgroundColor: theme.palette.primary.main,
      borderRadius: '5px',
    },
    [theme.breakpoints.up('md')]: {
      paddingBottom: '50px',
    },
    [theme.breakpoints.up('lg')]: {
      paddingBottom: '40px',
    },
  },
  form: {
    [theme.breakpoints.up('xs')]: {
      width: '100%',
      padding: '40px 20px',
      '& label': {
        color: '#fff',
        paddingLeft: '20px',
        marginTop: '20px',
      },
      '& label.Mui-focused': {
        color: '#fff',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#fff',
        paddingBottom: '50px',
      },
      '& .MuiInputBase-input': {
        color: '#fff',
      },
    },
    [theme.breakpoints.up('lg')]: {
      width: '100%',
      padding: '60px 10%',
      '& label': {
        paddingLeft: '10%',
        marginTop: '40px',
      },
    },
  },
  btnBox: {
    [theme.breakpoints.up('xs')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: "13px"
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: "20px"
    },
  },
  submit: {
    [theme.breakpoints.up('xs')]: {
      color: '#fff',
      borderColor: "#fff",

    },
  },
}))

export default articleCreationTheme
