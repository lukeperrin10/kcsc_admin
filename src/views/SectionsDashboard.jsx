import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Typography, Divider, Box, AppBar, Tabs, Tab } from '@material-ui/core'
import useCommonStyles from '../theme/useCommonStyles'
import SectionsList from '../components/SectionsDashboard/SectionsList'
// import appData from '../data/app_data.json'
import FooterForm from '../components/GeneralDashboard/FooterForm'
import NavigationForm from '../components/GeneralDashboard/NavigationForm'
import TestimonialsForm from '../components/GeneralDashboard/TestimonialsForm'
import AppData from '../modules/AppData'

const SectionsDashboard = () => {
  const commonClasses = useCommonStyles()
  const app_data = useSelector((state) => state.app_data)
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
    debugger
  }

  return (
    <Box className={commonClasses.viewContainer}>
      <Box className={commonClasses.dashboardHeader}>
        <Typography
          data-cy='dashboard-header'
          variant='h5'
          style={{ fontWeight: 600 }}>
          Edit Sections Information
        </Typography>
      </Box>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor='primary'
        textColor='secondary.contrastText'>
        <Tab label='Services' />
        <Tab label='About organization' />
        <Tab label='About Self Care' />
        <Tab label='News' />
        <Tab label='Information' />
      </Tabs>
      <Box>
        <SectionsList route={value} />
      </Box>
    </Box>
  )
}

export default SectionsDashboard
