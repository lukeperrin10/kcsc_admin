import React, { useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
  Button,
  Divider,
  TextField,
} from '@material-ui/core'
import useCommonStyles from '../../theme/useCommonStyles'
import CarouselCardForm from './CarouselCardForm'
import CardCreateModal from './CardCreateModal'
import { Controller, useForm } from 'react-hook-form'
import Sections from '../../modules/Sections'

const SectionCarousel = ({ id, variant, header, cards, index }) => {
  const [expanded, setExpanded] = useState(true)
  const commonClasses = useCommonStyles()
  const [open, setOpen] = useState(false)
  const { control, handleSubmit } = useForm()

  const onSubmit = (newHeader) => {
    let section = {
      id: id,
      variant: variant,
      header: newHeader.header,
      cards: cards,
    }
    Sections.update(section)
  }

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
    <>
      <CardCreateModal
        open={open}
        setOpen={setOpen}
      />
      <Accordion
        style={{ backgroundColor: '#00000000' }}
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h6'>{`${index}) ${header}`}</Typography>
        </AccordionSummary>
        <AccordionDetails
          data-cy='section-edit-form'
          className={commonClasses.accordionDetails}>
          <Grid container direction='column'>
            <Grid item>
              <form
                data-cy='header-edit-form'
                onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3} alignItems='center'>
                  <Grid item>
                    <Controller
                      name='header'
                      control={control}
                      defaultValue={header}
                      rules={{ required: 'This field cannot be empty' }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <TextField
                          data-cy='header-input'
                          variant='outlined'
                          label={`Section Header`}
                          error={!!error}
                          helperText={error ? error.message : null}
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant='contained'
                      color='primary'
                      type='submit'
                      data-cy='header-submit'>
                      Change Header
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item style={{ marginTop: '1rem' }}>
              <Typography variant='h6'>Edit Cards in Carousel</Typography>
              <Divider />
            </Grid>
            <Grid item>
              <Button data-cy='add-new-card-button' color='primary' onClick={() => setOpen(true)}>
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
