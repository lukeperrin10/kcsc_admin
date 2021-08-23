import { makeStyles } from '@material-ui/core'

const useCommonStyles = makeStyles((theme) => ({
  viewContainer: {
    marginLeft: '200px',
    maxWidth: '1280px',
    [theme.breakpoints.down('md')]: {
      marginLeft: '0px',
      width: '100%',
    },
  },
}))

export default useCommonStyles
