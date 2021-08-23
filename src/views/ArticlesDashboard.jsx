import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles, withStyles } from '@material-ui/core/styles'
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
} from '@material-ui/core'

import Articles from '../modules/Articles'
import PublishedSwitch from '../components/ArticlesDashboard/PublishedSwitch'

const useStyles = makeStyles((theme) => ({
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
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0, 0.5)',
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
      padding: '20px 20% 20px 0px',
      marginLeft: '10%',
      '& label': {
        color: "#fff"
      },
      '& label.Mui-focused': {
        color: "#fff"
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: "#fff"
      },
    },
  },
  btnBox: {
    [theme.breakpoints.up('xs')]: {
      textColor: '#fff',
    },
  },
  dateCell: { minWidth: '100px' },
  titleCell: { minWidth: '400px' },
  switchLabel: { fontSize: '0.8rem' },
}))

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

const ArticlesDashboard = () => {
  const classes = useStyles()
  const articles = useSelector((state) => state.articles)
  const [open, setOpen] = useState(false)
  // Put fixture here to see articles on localhost
  //const [articles, setArticles] = useState([])

  useEffect(() => {
    Articles.index()
  }, [])

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

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const body = (
    <form
      noValidate
      autoComplete='off'
      className={classes.formGroup}
      data-cy='new-article-modal'>
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
      <TextField
        className={classes.form}
        data-cy='image-input'
        required
        id='standard-required'
        label='Image'
      />
      <Box className={classes.btnBox}>
        <Button data-cy='submit-btn' onClick={handleClose}>
          Submit
        </Button>
        <Button data-cy='cancel-btn' onClick={handleClose}>
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
