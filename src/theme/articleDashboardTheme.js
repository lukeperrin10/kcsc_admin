import { makeStyles } from "@material-ui/core" 

const articleDashboard = makeStyles((theme) => ({
  tableContainer: {
    marginLeft: '200px',
    maxWidth: '1280px',
    [theme.breakpoints.down('md')]: {
      marginLeft: '0px',
      width: '100%',
    },
  },
  newArticleBtn: {
    [theme.breakpoints.up('xs')]: {
      fontSize: '1px',
      backgroundColor: '#5cb85c',
      color: '#fff',
      width: '300px',
      margin: '20px 0px',
    },
  },
  modal: {
    [theme.breakpoints.up('xs')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  formGroup: {
    [theme.breakpoints.up('xs')]: {
      margin: '10vh 10vw',
      height: '80%',
      width: '80%',
      backgroundColor: theme.palette.primary.main,
      borderRadius: '5px',
    },
  },
  form: {
    [theme.breakpoints.up('xs')]: {
      width: '100%',
      padding: '20px 20% 20px 20%',
      '& label': {
        color: '#fff',
        paddingLeft: "20%"
      },
      '& label.Mui-focused': {
        color: '#fff',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#fff',
      },
    },
  },
  thumbnailContainer: {
    [theme.breakpoints.up('xs')]: {
      height: "auto",
      width: "auto",
      maxHeight: "200px",
      maxWidth: "400px",
    },
  },
  btnBox: {
    [theme.breakpoints.up('xs')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  submit: {
    [theme.breakpoints.up('xs')]: {
      color: '#fff',
    },
  },
  cancel: {
    [theme.breakpoints.up('xs')]: {
      color: '#fff',
    },
  },
  input: { display: 'none' },
  dateCell: { minWidth: '100px' },
  titleCell: { minWidth: '400px' },
  switchLabel: { fontSize: '0.8rem' },
}))

export default articleDashboard