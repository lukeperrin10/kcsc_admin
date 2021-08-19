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
    width: '1rem',
  },
  column2: {
    width: 'auto',
    fontWeight: 800,
  },
  column3: {
    maxWidth: '1rem',
  },
  column1Header: {
    width: '1rem',
    color: 'white',
    fontWeight: 800,
    fontSize: '1.2rem',
  },
  column2Header: {
    width: 'auto',
    color: 'white',
    fontWeight: 800,
    fontSize: '1.2rem',
  },
  column3Header: {
    maxWidth: '1rem',
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
      <TableRow key={`article-${id}`}>
        <TableCell className={classes.column1}>
          <FormControlLabel
            control={<Switch checked={publish} name={`publish-${id}`} />}
            label={publish ? 'Published' : 'Hidden'}
            labelPlacement='bottom'
          />
        </TableCell>
        <TableCell className={classes.column2}>{title}</TableCell>
        <TableCell className={classes.column3}>{author}</TableCell>
        <TableCell className={classes.column3}>{date}</TableCell>
        <TableCell className={classes.column3}>Placeholder</TableCell>
      </TableRow>
    )
  })

  return (
    <>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableHead className={classes.tableHeader}>{tableHeader}</TableHead>
          <TableBody>{tableRows}</TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ArticlesDashboard
