import React, { useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
} from '@material-ui/core'
import useCommonStyles from '../../theme/useCommonStyles'

const SectionRegularForm = ({ variant }) => {
  const [expanded, setExpanded] = useState(true)
  const commonClasses = useCommonStyles()

  return (
    <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant='h6'>{variant}</Typography>
      </AccordionSummary>
      <AccordionDetails className={commonClasses.accordionDetails}>
        <Grid container direction='column' spacing={3}></Grid>
      </AccordionDetails>
    </Accordion>
  )
}

export default SectionRegularForm
