import React, { useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
  Button,
} from '@material-ui/core'
import useCommonStyles from '../../theme/useCommonStyles'
import CarouselCardForm from './CarouselCardForm'
import CardCreateModal from './CardCreateModal'

const SectionCarousel = ({ id, variant, header, cards, index }) => {
  const [expanded, setExpanded] = useState(true)
  const commonClasses = useCommonStyles()
  const [open, setOpen] = useState(false)

  const sectionSubmit = (newCard) => {
    if (newCard.id) {
      let newCards = cards
      let cardIndex = newCards.findIndex((card) => card.id === newCard.id)
      newCards[cardIndex] = newCard
      let section = {
        id: id,
        variant: variant,
        header: header,
        cards: newCards,
      }
      console.log({ section: section })
    } else {
      const newCards = cards.push(newCard)
      let section = {
        id: id,
        variant: variant,
        header: header,
        cards: newCards,
      }
      console.log({ section: section })
    }
  }

  const cardList = cards.map((card, arrayIndex) => {
    return (
      <Grid key={`card-form-${arrayIndex}`} item xs={12} md={6}>
        <CarouselCardForm
          card={card}
          arrayIndex={arrayIndex}
          sectionSubmit={sectionSubmit}
        />
      </Grid>
    )
  })

  return (
    <>
      <CardCreateModal open={open} setOpen={setOpen}/>
      <Accordion
        style={{ backgroundColor: '#00000000' }}
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h6'>{`${index}) ${header}`}</Typography>
        </AccordionSummary>
        <AccordionDetails className={commonClasses.accordionDetails}>
          <Grid container direction='column'>
            <Grid item>
              <Button color='primary' onClick={() => setOpen(true)}>
                + ADD NEW CARD
              </Button>
            </Grid>
            <Grid item container direction='row' spacing={3}>
              {cardList}
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default SectionCarousel
