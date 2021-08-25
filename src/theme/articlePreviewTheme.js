import { makeStyles } from '@material-ui/core'

const articlePreview = makeStyles((theme) => ({
  modal: {
    overflow: "scroll"
  },
  articleContainer: {
    backgroundColor: '#fff',
    marginTop: "180px",
    marginBottom: "180px",
    maxWidth: "960px",
    padding: "80px",
  },
  information: {
    marginTop: "12px",
  },
  image: {
    width: "100%",
    margin: "12px 0",
    maxHeight: "500px",
    minHeight: '200px',
    objectFit: "cover",
  },
  divider: {
    marginBottom: "12px",
  },
  body: {
    whiteSpace: "pre-wrap"
  }
}))

export default articlePreview
