import React, { useEffect } from 'react'
import Articles from '../modules/Articles'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
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
} from '@material-ui/core'

const useStyles = makeStyles({
  tableContainer: {
    marginLeft: '200px',
    maxWidth: '1720px',
  },
  tableHeader: {
    backgroundColor: '#FBBA00',
    color: 'white',
  },
  column1: {
    width: '10%',
  },
  column2: {
    width: '70%',
    fontWeight: 800,
  },
  column3: {
    width: '10%',
  },
  column1Header: {
    maxWidth: '10%',
    color: 'white',
    fontWeight: 800,
    fontSize: '1.2rem',
  },
  column2Header: {
    maxWidth: '70%',
    color: 'white',
    fontWeight: 800,
    fontSize: '1.2rem',
  },
  column3Header: {
    maxWidth: '10%',
    color: 'white',
    fontWeight: 800,
    fontSize: '1.2rem',
  },
})

const ArticlesDashboard = () => {
  const classes = useStyles()
  const articles = useSelector((state) => state.articles)

  useEffect(() => {
    Articles.index()
  }, [])

  const tableHeader = (
    <TableRow>
      <TableCell className={classes.column1Header}>Status</TableCell>
      <TableCell className={classes.column2Header}>Title</TableCell>
      <TableCell className={classes.column3Header}>Author</TableCell>
      <TableCell className={classes.column3Header}>Date</TableCell>
      <TableCell className={classes.column3Header}>Action</TableCell>
    </TableRow>
  )

  const tableRows = articles.map((article) => {
    const { id, title, author, date, publish } = article
    return (
      <TableRow data-cy='article' key={`article-${id}`}>
        <TableCell data-cy='status' className={classes.column1}>
          <FormControlLabel
            control={<Switch checked={publish} name={`publish-${id}`} />}
            label={publish ? 'Published' : 'Hidden'}
            labelPlacement='bottom'
          />
        </TableCell>
        <TableCell data-cy='title' className={classes.column2}>
          {title}
        </TableCell>
        <TableCell data-cy='author' className={classes.column3}>
          {author}
        </TableCell>
        <TableCell data-cy='date' className={classes.column3}>
          {date}
        </TableCell>
        <TableCell data-cy='action' className={classes.column3}>
          Placeholder
        </TableCell>
      </TableRow>
    )
  })

  return (
    <>
      <TableContainer
        data-cy='articles-table'
        component={Paper}
        className={classes.tableContainer}>
        <Table>
          <TableHead className={classes.tableHeader}>{tableHeader}</TableHead>
          <TableBody>{tableRows}</TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ArticlesDashboard
