import React, { useEffect } from 'react'
import Articles from '../modules/Articles'
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
  Switch,
  FormControlLabel,
  Typography,
} from '@material-ui/core'

const useStyles = makeStyles({
  tableContainer: {
    marginLeft: '200px',
    maxWidth: '1280px',
  },
})

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
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const StyledSwitch = withStyles({
  switchBase: {
    color: "#ddd",
    '&$checked': {
      color: "#0BDA51",
    },
    '&$checked + $track': {
      backgroundColor: "#00FF00",
    },
  },
  checked: {},
  track: {},
})(Switch);

const ArticlesDashboard = () => {
  const classes = useStyles()
  const articles = useSelector((state) => state.articles)

  useEffect(() => {
    Articles.index()
  }, [])

  const tableHeader = (
    <StyledTableRow color='secondary'>
      <StyledTableCell align='center' >Status</StyledTableCell>
      <StyledTableCell align='left' >Title</StyledTableCell>
      <StyledTableCell align='left' >Author</StyledTableCell>
      <StyledTableCell align='left' >Date</StyledTableCell>
      <StyledTableCell align='left' >Action</StyledTableCell>
    </StyledTableRow>
  )

  const tableRows = articles && articles.map((article) => {
    const { id, title, author, date, publish } = article
    return (
      <StyledTableRow data-cy='article' key={`article-${id}`}>
        <StyledTableCell data-cy='status' align='center'>
          <FormControlLabel
            control={<StyledSwitch checked={publish} name={`publish-${id}`} />}
            label={publish ? 'Published' : 'Hidden'}
            labelPlacement='bottom'
          />
        </StyledTableCell>
        <StyledTableCell data-cy='title' style={{minWidth: "70%"}}>
          {title}
        </StyledTableCell>
        <StyledTableCell data-cy='author' >
          {author}
        </StyledTableCell>
        <StyledTableCell data-cy='date' >
          {date}
        </StyledTableCell>
        <StyledTableCell data-cy='action' >
          Placeholder
        </StyledTableCell>
      </StyledTableRow>
    )
  })

  const noArticlesMessage = (
    <Typography variant='h6' style={{padding: '12px'}}>
      No articles to display
    </Typography>
  )

  return (
    <>
      <TableContainer
        data-cy='articles-table'
        component={Paper}
        className={classes.tableContainer}>
        <Table>
          <TableHead>{tableHeader}</TableHead>
          <TableBody>{articles ? tableRows : noArticlesMessage}</TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ArticlesDashboard
