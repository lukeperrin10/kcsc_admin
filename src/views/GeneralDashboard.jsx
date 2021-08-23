import React, { useState } from 'react'
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import useCommonStyles from '../theme/useCommonStyles'
import app_data from '../data/add_data.json'
import { TramRounded } from '@material-ui/icons'

const GeneralDashboard = () => {
  const commonClasses = useCommonStyles()
  const [appData, setAppData] = useState(app_data)
  const [expanded, setExpanded] = useState({ footer: true })

  return (
    <>
      <Box className={commonClasses.viewContainer}>
        <Accordion
          expanded={expanded.footer}
          onChange={() =>
            setExpanded({ ...expanded, footer: !expanded.footer })
          }>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant='h5'>Footer</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  )
}

export default GeneralDashboard
