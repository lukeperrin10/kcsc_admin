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
} from '@material-ui/core'

const ArticlesDashboard = () => {
  const articles = useSelector((state) => state.articles)
  useEffect(() => {
    Articles.index()
  }, [])

  return (
    <>
      <div>{JSON.stringify(articles)}</div>
    </>
  )
}

export default ArticlesDashboard
