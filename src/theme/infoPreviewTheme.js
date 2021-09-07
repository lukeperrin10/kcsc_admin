import { makeStyles } from '@material-ui/core'

const infoPreview = makeStyles((theme) => ({
  modal: {
    overflow: 'scroll',
    marginTop: '40px',
  },
  card: {
    minHeight: "148px",
    maxWidth: "800px",
  },
  fullHeight: {
    height: "100%",
    width: '100%',
  },
  cardContent: {
    padding: "40px",
  },
  contentField: {
    margin: "30px 0px",
  },
  buttonsContainer: {
    display: 'flex',
    direction: 'row',
    justifyContent: 'space-between',
  },
  closeBtn: {
    margin: '40px',
    borderRadius: '5px',
  },
}))

export default infoPreview