import React from 'react'
import { Box } from '@material-ui/core'
import useCommonStyles from '../theme/useCommonStyles'

const GeneralDashboard = () => {
  const commonClasses = useCommonStyles()
  return (
    <>
      <Box className={commonClasses.viewContainer}>
        <div>General View</div>
      </Box>
    </>
  )
}

export default GeneralDashboard
