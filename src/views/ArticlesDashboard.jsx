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
  column1: {
    maxWidth: '2rem',
  }
})

const ArticlesDashboard = () => {
  const classes = useStyles()
  const articles = useSelector((state) => state.articles)

  useEffect(() => {
    Articles.index()
  }, [])

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
        <TableCell>{title}</TableCell>
        <TableCell>{author}</TableCell>
        <TableCell>{date}</TableCell>
        <TableCell>Placeholder</TableCell>
      </TableRow>
    )
  })

  return (
    <>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.column1}>Status</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableRows}</TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ArticlesDashboard
