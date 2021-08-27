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
import CarouselCardForm from './CarouselCardForm'

const SectionCarousel = ({ id, variant, header, cards, index }) => {
  const [expanded, setExpanded] = useState(true)
  const commonClasses = useCommonStyles()

  const cardList = cards.map((card, arrayIndex) => {
    return (
      <Grid key={`card-form-${arrayIndex}`} item xs={12} md={6}>
        <CarouselCardForm
          card={card}
          arrayIndex={arrayIndex}
        />
      </Grid>
    )
  })

  return (
    
      <Accordion
        style={{ backgroundColor: '#00000000' }}
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h6'>{`${index}) ${header}`}</Typography>
        </AccordionSummary>
        <AccordionDetails className={commonClasses.accordionDetails}>
          <Grid container direction='row' spacing={3}>
            {cardList}          
          </Grid>
        </AccordionDetails>
      </Accordion>
    
  )
}

export default SectionCarousel
