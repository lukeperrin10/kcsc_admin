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
  Typography,
} from '@material-ui/core'

import Information from '../modules/Information'
import informationDashboard from '../theme/informationDashboardTheme'

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

const InformationDashboard = () => {
  const classes = informationDashboard()
  const information = useSelector((state) => state.information_items)

  useEffect(() => {
    Information.index()
  }, [])

  const tableHeader = (
    <StyledTableRow color='secondary'>
      <StyledTableCell align='center'>Status</StyledTableCell>
      <StyledTableCell align='left'>Header</StyledTableCell>
      <StyledTableCell align='left'>Description</StyledTableCell>
      <StyledTableCell align='left'>Link</StyledTableCell>
      <StyledTableCell align='left'>Action</StyledTableCell>
    </StyledTableRow>
  )

  const tableRows =
    information &&
    information.map((information_item) => {
      const { id, header, description, link } = information_item
      return (
        <>
          <StyledTableRow data-cy='information' key={id}>
            <StyledTableCell
              data-cy='status'
              align='center'
              className={classes.cell}>
              placeholder
            </StyledTableCell>
            <StyledTableCell data-cy='header' className={classes.cell}>
              {header}
            </StyledTableCell>
            <StyledTableCell data-cy='description' className={classes.cell}>
              {description}
            </StyledTableCell>
            <StyledTableCell data-cy='link' className={classes.cell}>
              {link}
            </StyledTableCell>
            <StyledTableCell data-cy='action' className={classes.cell}>
              Placeholder
            </StyledTableCell>
          </StyledTableRow>
        </>
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
        data-cy='information-table'
        component={Paper}
        className={classes.tableContainer}>
        <Table>
          <TableHead>{tableHeader}</TableHead>
          <TableBody>{information ? tableRows : noArticlesMessage}</TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default InformationDashboard
