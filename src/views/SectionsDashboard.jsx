import React, { useState } from 'react'
import {
  Typography,
  Divider,
  Box,
  Tabs,
  Tab,
  useMediaQuery,
} from '@material-ui/core'
import useCommonStyles from '../theme/useCommonStyles'
import SectionsList from '../components/SectionsDashboard/SectionsList'
import { withStyles, useTheme } from '@material-ui/core/styles'

const StyledTab = withStyles({
  root: {
    margin: 'auto',
    minWidth: '100%',
    '@media screen and (min-width: 600px)': {
      minWidth: '0',
    },
  },
  selected: {
    color: '#E86406',
    fontWeight: 600,
  },
})(Tab)

const SectionsDashboard = () => {
  const commonClasses = useCommonStyles()
  const [value, setValue] = useState(0)
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('xs'))

  const handleChange = (event, newValue) => {
    setValue(newValue)
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
        scrollButtons='auto'
        orientation={mobile ? 'vertical' : 'horizontal'}
        value={value}
        onChange={handleChange}
        indicatorColor='primary'
        >
        <StyledTab
          data-cy='navigation-tab'
          style={{ margin: 'auto' }}
          label='Services'
        />
        <StyledTab
          data-cy='navigation-tab'
          style={{ margin: 'auto' }}
          label='About organization'
        />
        <StyledTab
          data-cy='navigation-tab'
          style={{ margin: 'auto' }}
          label='About Self Care'
        />
        <StyledTab
          data-cy='navigation-tab'
          style={{ margin: 'auto' }}
          label='Information'
        />
      </Tabs>
      {mobile && <Divider />}
      <Box>
        <SectionsList tabValue={value} />
      </Box>
    </Box>
  )
}

export default SectionsDashboard
