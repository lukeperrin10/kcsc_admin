import React, { useState } from 'react'
import {
  Card,
  CardMedia,
  Typography,
  FormControlLabel,
  Switch,
  IconButton,
  TextField,
  Grid,
  Button,
} from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'
import carouselCard from '../../theme/carouselCardTheme'
import { useWatch } from 'react-hook-form'
import { PhotoCamera } from '@material-ui/icons'
import SubmitButton from '../SubmitButton'
import Cards from '../../modules/Cards'

const CarouselCard = ({
  card,
  arrayIndex,
  create,
  handleClose,
}) => {
  const classes = carouselCard()
  const descriptionMaxLength = 250
  const { logo, alt, organization, description, links, publish } = card
  const [preview, setPreview] = useState()
  const [newLogo, setNewLogo] = useState(card.logo)
  const { control, handleSubmit } = useForm()
  const disable = useWatch({
    control,
    name: `card.publish`,
    defaultValue: publish ? publish : true,
  })

  const onSubmit = (formData) => {
    if (create) {
      const newCard = { ...formData.card, logo: newLogo }
      Cards.create(newCard)
    }
  }

  const imageEncoder = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  const handleImage = async (event) => {
    let file = event.target.files[0]
    setPreview(file)
    let encodedFile = await imageEncoder(file)
    setNewLogo(encodedFile)
  }

  return (
    <form data-cy='cards-form-section' onSubmit={handleSubmit(onSubmit)}>
      <Card
        data-cy='carousel-card-form'
        elevation={0}
        variant='outlined'
        className={classes.card}>
        <Grid container direction='column' spacing={3}>
          <Grid item container direction='row' justifyContent='space-between'>
            <Grid item>
              <FormControlLabel
                control={
                  <Controller
                    name={`card.publish`}
                    control={control}
                    defaultValue={publish ? publish : true}
                    render={({ field: { onChange, value } }) => (
                      <Switch
                        data-cy='visible-switch'
                        size='small'
                        checked={value}
                        onChange={onChange}
                        name='visible-switch'
                      />
                    )}
                  />
                }
                label={
                  <Typography className={classes.switchLabel}>
                    {disable ? 'Visible' : 'Hidden'}
                  </Typography>
                }
                labelPlacement='bottom'
              />
            </Grid>
            {create && (
              <>
                <Grid item>
                  <Button
                    className={classes.closeBtn}
                    variant='contained'
                    color='primary'
                    type='submit'
                    data-cy='submit-button'>
                    Submit
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    className={classes.closeBtn}
                    color='primary'
                    data-cy='close-button'
                    type='button'
                    onClick={handleClose}>
                    Close
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
          <Grid item container style={{ height: '250px' }}>
            <CardMedia
              className={classes.logo}
              data-cy='image-preview'
              component='img'
              style={!disable ? { filter: 'grayscale(100%)' } : undefined}
              src={preview ? URL?.createObjectURL(preview) : logo}
            />
          </Grid>
          <Grid item container justifyContent='flex-end'>
            <input
              accept='image/*'
              style={{ display: 'none' }}
              id={`card-image-input-section-${arrayIndex}`}
              type='file'
              disabled={!disable}
              onChange={(event) => {
                handleImage(event)
              }}
            />
            <label htmlFor={`card-image-input-section-${arrayIndex}`}>
              <IconButton
                data-cy='image-upload-button'
                color={!disable ? 'default' : 'primary'}
                component='span'>
                <PhotoCamera />
              </IconButton>
            </label>
          </Grid>
          <Grid item>
            <Controller
              name={`card.alt`}
              control={control}
              defaultValue={alt}
              rules={{ required: 'This field cannot be empty' }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  data-cy='alt-input'
                  label={`Logo Alt attribute*`}
                  error={!!error}
                  disabled={!disable}
                  fullWidth
                  helperText={error ? error.message : null}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              name={`card.organization`}
              control={control}
              defaultValue={organization}
              rules={{ required: 'This field cannot be empty' }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  data-cy='name-input'
                  label={`Organization name*`}
                  variant='outlined'
                  error={!!error}
                  disabled={!disable}
                  fullWidth
                  helperText={error ? error.message : null}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              name={`card.description`}
              control={control}
              defaultValue={description}
              rules={{ required: 'This field cannot be empty' }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  data-cy='description-input'
                  variant='outlined'
                  multiline
                  minRows={4}
                  label={`Description (max ${descriptionMaxLength} char.)*`}
                  inputProps={{ maxLength: descriptionMaxLength }}
                  error={!!error}
                  disabled={!disable}
                  fullWidth
                  helperText={error ? error.message : null}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              name={`card.links.web`}
              control={control}
              defaultValue={links.web}
              render={({ field: { onChange, value } }) => (
                <TextField
                  data-cy='web-input'
                  label={`Link to website`}
                  fullWidth
                  disabled={!disable}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              name={`card.links.facebook`}
              control={control}
              defaultValue={links.web}
              render={({ field: { onChange, value } }) => (
                <TextField
                  data-cy='facebook-input'
                  label={`Link to Facebook`}
                  fullWidth
                  disabled={!disable}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              name={`card.links.twitter`}
              control={control}
              defaultValue={links.web}
              render={({ field: { onChange, value } }) => (
                <TextField
                  data-cy='twitter-input'
                  label={`Link to Twitter`}
                  fullWidth
                  disabled={!disable}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Grid>
          {!create && <SubmitButton dataCy='submit-button' />}
        </Grid>
      </Card>
    </form>
  )
}

export default CarouselCard
