import React, { useEffect, useState } from 'react'
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

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    marginLeft: '200px',
    maxWidth: '1280px',
    [theme.breakpoints.down('md')]: {
      marginLeft: '0px',
      width: '100%',
    },
  },
  dateCell: { minWidth: '100px' },
  titleCell: { minWidth: '400px' },
  switchLabel: {fontSize: '0.8rem'}
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

const StyledSwitch = withStyles({
  switchBase: {
    color: '#ddd',
    '&$checked': {
      color: '#0BDA51',
    },
    '&$checked + $track': {
      backgroundColor: '#00FF00',
    },
  },
  checked: {},
  track: {},
})(Switch)

const ArticlesDashboard = () => {
  const classes = useStyles()
  //const articles = useSelector((state) => state.articles)
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: 'Most recent article',
      author: 'Liu Kang',
      publish: true,
      teaser:
        'As self-care has become more mainstream, the definitions have started to become more applicable to the general public and tend to focus on tuning in to one’s needs and meeting those needs. “Self-care is anything that you do for yourself that ...',
      date: '2021-05-12',
      image: {
        url: 'https://healthtechmagazine.net/sites/healthtechmagazine.net/files/styles/cdw_hero/public/articles/%5Bcdw_tech_site%3Afield_site_shortname%5D/202007/20200630_HT_Web_MonITor_Tech-Organizations-Should-Consider.jpg?itok=adOWwJ9x',
        alt: 'Nice doctor picture',
      },
    },
    {
      id: 2,
      title:
        'Really long article title that should be broken up or it will look bad Really long article title that should be broken up or it will look bad',
      author: 'Sonya Blade',
      publish: true,
      teaser:
        'Several organizations and researchers take a health-oriented approach when defining self-care. The World Health Organization defines self-care as: “the ability of individuals, families, and communities to promote health ...',
      date: '2021-05-11',
      image: {
        url: 'https://i1.wp.com/www.thekashmirmonitor.net/wp-content/uploads/2020/02/nurse.jpg',
        alt: 'Doctor holding tablet',
      },
    },
    {
      id: 3,
      title: 'Article 3',
      author: 'Liu Kang',
      publish: false,
      teaser:
        'According to this definition, self-care includes everything related to staying physically healthy — including hygiene, nutrition, and ...',
      date: '2021-05-10',
      image: {
        url: 'https://i1.wp.com/www.thekashmirmonitor.net/wp-content/uploads/2020/02/nurse.jpg',
        alt: 'Doctor holding tablet',
      },
    },
    {
      id: 4,
      title: 'Article 4',
      author: 'Liu Kang',
      publish: true,
      teaser:
        'Paula Gill Lopez, PhD, an associate professor and chair of the department of psychological and educational consultation at Fairfield University in Fairfield, Connecticut, says the need ...',
      date: '2021-05-09',
      image: {
        url: 'https://i1.wp.com/www.thekashmirmonitor.net/wp-content/uploads/2020/02/nurse.jpg',
        alt: 'Doctor holding tablet',
      },
    },
    {
      id: 5,
      title: 'Article 5',
      author: 'Sonya Blade',
      publish: false,
      teaser:
        'Let’s clear up one common misconception from the get-go: Self-care is not synonymous with self-indulgence or being selfish. Self-care means ...',
      date: '2021-05-08',
      image: {
        url: 'https://i1.wp.com/www.thekashmirmonitor.net/wp-content/uploads/2020/02/nurse.jpg',
        alt: 'Doctor holding tablet',
      },
    },
    {
      id: 6,
      title: 'Article 6',
      author: 'Sonya Blade',
      publish: false,
      teaser:
        'Tens of millions of Americans have lost crucial jobless benefits, and lawmakers still can’t seem to agree on a relief measure. Israel’s troubled school reopenings could be a lesson for the U.S.',
      date: '2021-05-07',
      image: {
        url: 'https://i1.wp.com/www.thekashmirmonitor.net/wp-content/uploads/2020/02/nurse.jpg',
        alt: 'Doctor holding tablet',
      },
    },
  ])

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
              control={
                <StyledSwitch size="small" checked={publish} name={`publish-${id}`} />
              }
              label={<Typography className={classes.switchLabel}>{publish ? 'Published' : 'Hidden'}</Typography>}
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
