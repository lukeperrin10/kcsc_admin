import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  // Switch,
  FormControlLabel,
  Typography,
  Button,
  Modal,
  TextField,
  Box,
  CardMedia,
} from '@material-ui/core'

import Articles, { imageEncoder } from '../modules/Articles'
import PublishedSwitch from '../components/ArticlesDashboard/PublishedSwitch'
import articleDashboard from '../theme/articleDashboardTheme'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    fontSize: '1.2rem',
    fontWeight: 800,
  },
  body: {
    fontSize: '1rem',
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

const newArticle = {
  title: '',
  teaser: '',
  body: '',
  author: '',
}

const ArticlesDashboard = () => {
  const classes = articleDashboard()
  const articles = useSelector((state) => state.articles)
  const [open, setOpen] = useState(false)
  const [article, setArticle] = useState(newArticle)
  const [thumbnail, setThumbnail] = useState()
  // Put fixture here to see articles on localhost
  //const [articles, setArticles] = useState([])

  useEffect(() => {
    Articles.index()
  }, [])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async () => {
    Articles.create(article)
  }

  const handleImage = async (event) => {
    let file = event.target.files[0]
    setThumbnail(file)
    let encodedFile = await imageEncoder(file)
    setArticle({
      ...article,
      image: encodedFile,
    })
  }

  const tableHeader = (
    <StyledTableRow color='secondary'>
      <StyledTableCell align='center'>Status</StyledTableCell>
      <StyledTableCell align='left'>Title</StyledTableCell>
      <StyledTableCell align='left'>Author</StyledTableCell>
      <StyledTableCell align='left'>Date</StyledTableCell>
      <StyledTableCell align='left'>Action</StyledTableCell>
    </StyledTableRow>
  )

  const tableRows =
    articles &&
    articles.map((article) => {
      const { id, title, author, date, publish } = article
      return (
        <StyledTableRow data-cy='article' key={`article-${id}`}>
          <StyledTableCell data-cy='status' align='center'>
            <FormControlLabel
              control={<PublishedSwitch publish={publish} articleId={id} />}
              label={
                <Typography className={classes.switchLabel}>
                  {publish ? 'Published' : 'Hidden'}
                </Typography>
              }
              labelPlacement='bottom'
            />
          </StyledTableCell>
          <StyledTableCell data-cy='title' className={classes.titleCell}>
            {title}
          </StyledTableCell>
          <StyledTableCell data-cy='author'>{author}</StyledTableCell>
          <StyledTableCell data-cy='date' className={classes.dateCell}>
            {date}
          </StyledTableCell>
          <StyledTableCell data-cy='action'>Placeholder</StyledTableCell>
        </StyledTableRow>
      )
    })

  const noArticlesMessage = (
    <Typography variant='h6' style={{ padding: '12px' }}>
      No articles to display
    </Typography>
  )

  const body = (
    <form
      noValidate
      autoComplete='off'
      className={classes.formGroup}
      data-cy='new-article-modal'
      onSubmit={handleSubmit}>
      <TextField
        className={classes.form}
        data-cy='title-input'
        required
        id='standard-required'
        label='Title'
      />
      <TextField
        className={classes.form}
        data-cy='teaser-input'
        required
        id='standard-required'
        label='Teaser'
      />
      <TextField
        className={classes.form}
        data-cy='body-input'
        required
        multiline
        id='standard-required'
        label='Body'
      />
      <TextField
        className={classes.form}
        data-cy='author-input'
        required
        id='standard-required'
        label='Author'
      />
      <Box>
        <input
          accept='image/*'
          className={classes.input}
          id='contained-button-file'
          multiple
          type='file'
          onChange={(event) => handleImage(event)}
        />
        <label htmlFor='contained-button-file'>
          <Button variant='contained' color='#fff' component='span'>
            Upload Image
          </Button>
        </label>
        <Box>
          {article.image ? (
            <CardMedia
              className={classes.thumbnailContainer}
              data-cy='thumbnail'
              component='img'
              image={thumbnail ? URL.createObjectURL(thumbnail) : article.image}
              alt='thumbnail'
            />
          ) : (
            <Box>
              <p style={{ fontSize: 20, color: 'white' }}>Thumbnail</p>
            </Box>
          )}
        </Box>
      </Box>
      <Box className={classes.btnBox}>
        <Button className={classes.submit} data-cy='submit-btn' type='submit'>
          Submit
        </Button>
        <Button
          className={classes.cancel}
          data-cy='cancel-btn'
          onClick={handleClose}>
          Cancel
        </Button>
      </Box>
    </form>
  )

  return (
    <>
      <TableContainer
        data-cy='articles-table'
        component={Paper}
        className={classes.tableContainer}>
        <Table>
          <Button
            data-cy='new-article-btn'
            className={classes.newArticleBtn}
            onClick={handleOpen}>
            Create new article
          </Button>
          <Modal
            disableBackdropClick={true} //Deprecated look in to
            className={classes.modal}
            open={open}
            onClose={handleClose}
            aria-labelledby='create new article'
            aria-describedby='opens a modal to create a new article'>
            {body}
          </Modal>
          <TableHead>{tableHeader}</TableHead>
          <TableBody>{articles ? tableRows : noArticlesMessage}</TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ArticlesDashboard
