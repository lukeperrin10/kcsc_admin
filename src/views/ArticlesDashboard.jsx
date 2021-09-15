import React, { useEffect } from 'react'
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
  FormControlLabel,
  Typography,
  Button,
} from '@material-ui/core'
import Articles from '../modules/Articles'
import PublishedSwitch from '../components/ArticlesDashboard/PublishedSwitch'
import ArticlePreviewModal from '../components/ArticlesDashboard/ArticlePreviewModal.jsx'
import articleDashboard from '../theme/articleDashboardTheme'
import useCommonStyles from '../theme/useCommonStyles'
import AddIcon from '@material-ui/icons/Add'
import { Link } from 'react-router-dom'

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
  const classes = articleDashboard()
  const commonClasses = useCommonStyles()
  const articles = useSelector((state) => state.articles)

  useEffect(() => {
    Articles.index()
  }, [])

  const rerender = () => {
    Articles.index()
  }

  const tableHeader = (
    <>
      <StyledTableRow color='secondary'>
        <StyledTableCell align='center'>Status</StyledTableCell>
        <StyledTableCell align='left'>Title</StyledTableCell>
        <StyledTableCell align='left'>Author</StyledTableCell>
        <StyledTableCell align='left'>Date</StyledTableCell>
        <StyledTableCell align='center'>Action</StyledTableCell>
      </StyledTableRow>
    </>
  )

  const tableRows =
    articles &&
    articles.map((article) => {
      const { id, title, author, date, published } = article

      return (
        <StyledTableRow data-cy='article' key={`article-${id}`}>
          <StyledTableCell data-cy='status' align='center'>
            <FormControlLabel
              control={
                <PublishedSwitch
                  publish={published}
                  articleId={id}
                  rerender={rerender}
                />
              }
              label={
                <Typography className={classes.switchLabel}>
                  {published ? 'Published' : 'Hidden'}
                </Typography>
              }
              labelPlacement='bottom'
            />
          </StyledTableCell>
          <StyledTableCell data-cy='title' className={classes.titleCell}>
            {title}
          </StyledTableCell>
          <StyledTableCell data-cy='author'>{author.name}</StyledTableCell>
          <StyledTableCell data-cy='date' className={classes.dateCell}>
            {date}
          </StyledTableCell>
          <StyledTableCell data-cy='action' align='center'>
            <ArticlePreviewModal article={article} />
          </StyledTableCell>
        </StyledTableRow>
      )
    })

  const noArticlesMessage = (
    <Typography variant='h6' style={{ padding: '12px' }}>
      No articles to display
    </Typography>
  )

  return (
    <>
      <TableContainer
        data-cy='articles-table'
        component={Paper}
        className={commonClasses.viewContainer}>
        <Table>
          <TableHead>{tableHeader}</TableHead>
          <TableBody>
            {articles ? tableRows : noArticlesMessage}
            <StyledTableRow>
              <StyledTableCell align='center'></StyledTableCell>
              <StyledTableCell align='left'></StyledTableCell>
              <StyledTableCell align='left'></StyledTableCell>
              <StyledTableCell align='left'></StyledTableCell>
              <StyledTableCell align='center'>
                <Button
                  data-cy='create-btn'
                  variant='contained'
                  color='primary'
                  component={Link}
                  to='/articles/create'>
                  <AddIcon />
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ArticlesDashboard
