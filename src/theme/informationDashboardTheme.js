import { makeStyles } from "@material-ui/core" 

const informationDashboard = makeStyles((theme) => ({
  tableContainer: {
    marginLeft: '200px',
    maxWidth: '100%',
    [theme.breakpoints.down('md')]: {
      marginLeft: '0px',
      width: '100%',
    },
  },
  cell: {width: "auto"},
}))

export default informationDashboard