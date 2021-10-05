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
import Information from '../modules/Information'
import Switches from '../components/InformationDashboard/Switches'
import InfoPreviewModal from '../components/InformationDashboard/InfoPreviewModal'
import informationDashboard from '../theme/informationDashboardTheme'
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

const InformationDashboard = () => {
  const classes = informationDashboard()
  const information = useSelector((state) => state.information_items)

  useEffect(() => {
    Information.index()
  }, [])

  const rerender = () => {
    Information.index()
  }

  const tableHeader = (
    <StyledTableRow color='secondary'>
      <StyledTableCell align='center'>Status</StyledTableCell>
      <StyledTableCell align='left'>Pinned</StyledTableCell>
      <StyledTableCell align='left'>Header</StyledTableCell>
      <StyledTableCell align='left'>Description</StyledTableCell>
      <StyledTableCell align='left'>Action</StyledTableCell>
    </StyledTableRow>
  )

  const tableRows =
    information &&
    information.map((informationItem) => {
      const { id, header, description, publish, pinned } = informationItem
      return (
        <StyledTableRow data-cy='information' key={id}>
          <StyledTableCell
            data-cy='status'
            align='center'
            className={classes.statusCell}>
            <FormControlLabel
              control={
                <Switches
                  value={publish}
                  name='publish'
                  itemId={id}
                  rerender={rerender}
                />
              }
              label={
                <Typography className={classes.switchLabel}>
                  {publish ? 'Published' : 'Hidden'}
                </Typography>
              }
              labelPlacement='bottom'
            />
          </StyledTableCell>
          <StyledTableCell data-cy='pinned' className={classes.statusCell}>
            <FormControlLabel
              control={
                <Switches
                  value={pinned}
                  name='pinned'
                  itemId={id}
                  rerender={rerender}
                />
              }
              label={
                <Typography className={classes.switchLabel}>
                  {pinned ? 'Pinned' : 'Other'}
                </Typography>
              }
              labelPlacement='bottom'
            />
          </StyledTableCell>
          <StyledTableCell data-cy='header' className={classes.headerCell}>
            {header}
          </StyledTableCell>
          <StyledTableCell data-cy='description' className={classes.descCell}>
            {description}
          </StyledTableCell>
          <StyledTableCell data-cy='action'>
            <InfoPreviewModal informationItem={informationItem} />
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
        data-cy='information-table'
        component={Paper}
        className={classes.tableContainer}>
        <Table>
          <TableHead>{tableHeader}</TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>
                <Button
                  data-cy='create-new-information'
                  variant='contained'
                  color='primary'
                  component={Link}
                  to='/information/create'>
                  <AddIcon />
                </Button>
              </StyledTableCell>
            </StyledTableRow>
            {information ? tableRows : noArticlesMessage}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default InformationDashboard
