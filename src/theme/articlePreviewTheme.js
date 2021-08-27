import { makeStyles } from '@material-ui/core'

const articlePreview = makeStyles((theme) => ({
  modal: {
    overflow: 'scroll',
  },
  articleContainer: {
    [theme.breakpoints.up('xs')]: {
      backgroundColor: '#fff',
      marginTop: '180px',
      marginBottom: '180px',
      maxWidth: '960px',
      padding: '30px',
    },
    [theme.breakpoints.up('sm')]: {
      padding: '80px',
    },
  },
  information: {
    marginTop: '12px',
  },
  image: {
    width: '100%',
    margin: '12px 0',
    maxHeight: '500px',
    minHeight: '200px',
    objectFit: 'cover',
  },
  divider: {
    marginBottom: '12px',
  },
  body: {
    whiteSpace: 'pre-wrap',
  },
  buttonsContainer: {
    display: 'flex',
    direction: 'row',
    justifyContent: 'space-between',
  },
  closeBtn: {
    marginTop: '40px',
  },
}))

export default articlePreview
