import { makeStyles } from '@material-ui/core'

const infoPreview = makeStyles((theme) => ({
  modal: {
    overflow: 'scroll',
  },
  card: {
    minHeight: "148px",
  },
  fullHeight: {
    height: "100%",
  },
  cardContent: {
    padding: "30px 20px",
  },
  contentField: {
    margin: "30px 20px",
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