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
}))

export default infoPreview