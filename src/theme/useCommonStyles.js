import { makeStyles } from '@material-ui/core'

const useCommonStyles = makeStyles((theme) => ({
  viewContainer: {
    marginLeft: '200px',
    maxWidth: '1280px',
    [theme.breakpoints.down('md')]: {
      marginLeft: '0px',
      width: '100%',
    },
  },
  dashboardHeader: {
    padding: '1rem 2rem',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  accordionDetails: {
    padding: '0 24px 24px 24px',
  },
  switchLabel: { fontSize: '0.8rem' },
  image: {
    margin: '10px 0 50px 0',
    maxHeight: '500px',
    maxWidth: '500px',
  },
  formImage: {
    maxHeight: '300px', 
    maxWidth: '100%', 
    width: 'auto'
  }
}))

export default useCommonStyles
