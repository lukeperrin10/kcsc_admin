import React, { useState } from 'react'
import {
  Card,
  CardMedia,
  Typography,
  FormControlLabel,
  Switch,
  Button,
  Box,
  TextField,
  Grid,
} from '@material-ui/core'
import { Controller } from 'react-hook-form'
import carouselCard from '../../theme/carouselCardTheme'
import PublishedSwitch from '../ArticlesDashboard/PublishedSwitch'

const CarouselCard = ({ card, control, arrayIndex }) => {
  const classes = carouselCard()
  const descriptionMaxLength = 250
  const { logo, alt, organization, description, links, publish } = card
  const [disable, setDisable] = useState(publish)

  const handleChange = (e) => {    
    setDisable(e.target.checked)
  }

  return (
    <Card
      data-cy='carousel-card-form'
      elevation={0}
      variant='outlined'
      className={classes.card}>
      <Grid container direction='column' spacing={3}>
        <Grid item>
          <FormControlLabel
            control={
              <Controller
                name={`cards[${arrayIndex}].publish`}
                control={control}
                defaultValue={publish}
                render={({ field: { onChange, value } }) => (
                  <Switch
                    size='small'
                    checked={disable}
                    onChange={(e) => {
                      onChange()
                      handleChange(e)
                    }}
                    data-cy={`card-publish-${arrayIndex}`}
                    name={`card-publish-${arrayIndex}`}
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
        <Grid item container style={{ height: '150px' }}>
          <CardMedia
            className={classes.logo}
            data-cy='image-preview'
            component='img'
            style={!disable ? {filter: 'grayscale(100%)'} : undefined}
            src={logo}
          />
        </Grid>
        <Grid item>
          <Controller
            name={`cards[${arrayIndex}].alt`}
            control={control}
            defaultValue={alt}
            rules={{ required: 'This field cannot be empty' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
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
            name={`cards[${arrayIndex}].organization`}
            control={control}
            defaultValue={organization}
            rules={{ required: 'This field cannot be empty' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                data-cy='organization-input'
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
            name={`cards[${arrayIndex}].description`}
            control={control}
            defaultValue={description}
            rules={{ required: 'This field cannot be empty' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
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
            name={`cards[${arrayIndex}].web-link`}
            control={control}
            defaultValue={links.web}
            render={({ field: { onChange, value } }) => (
              <TextField
                data-cy='web-link-input'
                label={`Link to website*`}
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
            name={`cards[${arrayIndex}].facebook-link`}
            control={control}
            defaultValue={links.web}
            render={({ field: { onChange, value } }) => (
              <TextField
                data-cy='facebook-link-input'
                label={`Link to Facebook*`}
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
            name={`cards[${arrayIndex}].twitter-link`}
            control={control}
            defaultValue={links.web}
            render={({ field: { onChange, value } }) => (
              <TextField
                data-cy='twitter-link-input'
                label={`Link to Twitter*`}
                fullWidth
                disabled={!disable}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </Grid>
      </Grid>
    </Card>
  )
}

export default CarouselCard
