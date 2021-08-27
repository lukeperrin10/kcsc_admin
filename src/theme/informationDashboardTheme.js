import { makeStyles } from '@material-ui/core'

const informationDashboard = makeStyles((theme) => ({
  tableContainer: {
    marginLeft: '200px',
    width: '89vw',
    [theme.breakpoints.down('md')]: {
      marginLeft: '0px',
      width: '100vw',
    },
  },
  statusCell: {
    [theme.breakpoints.down('md')]: {
      maxWidth: '200px',
      minWidth: '100px',
    },
  },
  headerCell: {
    [theme.breakpoints.down('md')]: {
      maxWidth: '200px',
      minWidth: '200px',
    },
  },
  descCell: {
    [theme.breakpoints.down('md')]: {
      maxWidth: '400px',
      minWidth: '400px',
    },
  },
  actionCell: {
    [theme.breakpoints.down('md')]: {
      maxWidth: '200px',
      minWidth: '100px',
    },
  },
}))

export default informationDashboard
