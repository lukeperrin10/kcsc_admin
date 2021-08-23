import React, { useState } from 'react'
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Grid,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import useCommonStyles from '../theme/useCommonStyles'
import app_data from '../data/add_data.json'

const aboutMaxLength = 200
const copyrightMaxLength = 80
const accessabilityMaxLength = 80

const GeneralDashboard = () => {
  const commonClasses = useCommonStyles()
  const [appData, setAppData] = useState(app_data.app_data)
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
          <AccordionDetails className={commonClasses.accordionDetails}>
            <Grid container direction='column' spacing={3}>
              <Grid item>
                <TextField
                  variant='outlined'
                  fullWidth
                  label={`About CHWL (max ${aboutMaxLength} char.)`}
                  multiline
                  rows={2}
                  inputProps={{ maxLength: aboutMaxLength }}
                  value={appData.about}
                  onChange={(e) =>
                    setAppData({ ...appData, about: e.target.value })
                  }
                />
              </Grid>
              <Grid item>
                <TextField
                  variant='outlined'
                  fullWidth
                  label={`Copyright disclaimer (max ${copyrightMaxLength} char.)`}
                  inputProps={{ maxLength: copyrightMaxLength }}
                  value={appData.disclamers.copyright}
                  onChange={(e) =>
                    setAppData({
                      ...appData,
                      disclamers: {
                        ...appData.disclamers,
                        copyright: e.target.value,
                      },
                    })
                  }
                />
              </Grid>
              <Grid item>
                <TextField
                  variant='outlined'
                  fullWidth
                  label={`About CHWL (max ${accessabilityMaxLength} char.)`}
                  inputProps={{ maxLength: accessabilityMaxLength }}
                  value={appData.disclamers.accessability}
                  onChange={(e) =>
                    setAppData({
                      ...appData,
                      disclamers: {
                        ...appData.disclamers,
                        accessability: e.target.value,
                      },
                    })
                  }
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  )
}

export default GeneralDashboard
