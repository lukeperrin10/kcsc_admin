import { makeStyles } from '@material-ui/core'

const carouselCardTheme = makeStyles((theme) => ({
  card: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '200px',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop: '1rem',
  },
  buttonContainer: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: '20px',
  },
  logo: {
    margin: 'auto',
    maxHeight: '90%',
    maxWidth: '90%',
    objectFit: 'contain',
  },
  switchLabel: { fontSize: '0.8rem' },
}))

export default carouselCardTheme
