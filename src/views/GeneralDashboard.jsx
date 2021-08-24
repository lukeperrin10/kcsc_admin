import React from 'react'
import { Typography, Divider, Box } from '@material-ui/core'
import useCommonStyles from '../theme/useCommonStyles'
// import app_data from '../data/add_data.json'
import FooterForm from '../components/GeneralDashboard/FooterForm'
import AppData from '../modules/AppData'

const GeneralDashboard = () => {
  const commonClasses = useCommonStyles()
  const { about, disclaimers } = useSelector((state) => state.app_data)
  // Use that on localhost
  // const { about, disclaimers } = app_data.app_data

  useEffect(() => {  
    AppData.index()
  }, [])

  return (
    <Box className={commonClasses.viewContainer}>
      <Box className={commonClasses.dashboardHeader}>
        <Typography
          data-cy='dashboard-header'
          variant='h5'
          style={{ fontWeight: 600 }}>
          Edit General App Info
        </Typography>
      </Box>
      <Divider />
      <FooterForm about={about} disclaimers={disclaimers} />
    </Box>
  )
}

export default GeneralDashboard
