import React, { useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Grid,
  TextField,
  CardMedia,
  makeStyles,
  IconButton,
} from '@material-ui/core'
import useCommonStyles from '../../theme/useCommonStyles'
import SubmitButton from '../SubmitButton'
import { Controller, useForm } from 'react-hook-form'
import Sections from '../../modules/Sections'
import { PhotoCamera } from '@material-ui/icons'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import LanguageIcon from '@material-ui/icons/Language'
import CarouselCard from './CarouselCard'
const useStyles = makeStyles(() => ({
  input: {
    display: 'none',
  },
  image: {
    margin: '10px 0 50px 0',
    maxHeight: '500px',
    maxWidth: '500px',
  },

  imageEdit: {
    marginBottom: '10px',
  },
  form: {
    width: '70%',
    margin: '2% 2% 5% 2%',
  },

  formEdit: {
    width: '90%',
    margin: '1% 1% 3% 2%',
  },

  uploadBtn: {
    marginBottom: '50px',
  },
  camera: {
    marginBottom: '20px',
  },
}))

const SectionCarouselForm = ({ id, variant, header, cards, index }) => {
  const [expanded, setExpanded] = useState(true)
  const classes = useStyles()
  const commonClasses = useCommonStyles()
  const { control, watch, handleSubmit } = useForm()
  const descriptionMaxLength = 1500
  const [preview, setPreview] = useState('')
  const [newImage, setNewImage] = useState({ image: null })
  const [updatedImage, setUpdatedImage] = useState(false)

  const onSubmit = (formData) => {
    console.log(formData)
    // let updatedSection = {
    //   ...formData,
    //   image: { alt: newImage.alt, image: newImage.image },
    //   variant: variant,
    //   id: id,
    // }
    // Sections.update(updatedSection)
  }

  const imageEncoder = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  const handleChange = (event) => {
    setNewImage({ ...newImage, alt: event.target.value })
  }

  const handleImage = async (event) => {
    let file = event.target.files[0]
    setPreview(file)
    let encodedFile = await imageEncoder(file)
    setNewImage({
      ...newImage,
      image: encodedFile,
    })
    setUpdatedImage(true)
  }

  const cardList = cards.map((card, arrayIndex) => {
    return (
      <Grid item xs={12} md={6}>
        <CarouselCard card={card} control={control} arrayIndex={arrayIndex} watch={watch}/>
      </Grid>
    )
  })

  return (
    <form id={id} data-cy='section-edit-form' onSubmit={handleSubmit(onSubmit)}>
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
            <SubmitButton dataCy='section-submit-button' />
          </Grid>
        </AccordionDetails>
      </Accordion>
    </form>
  )
}

export default SectionCarouselForm
