import React from 'react'
import {
  Card,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  Button,
  Box,
  TextField,
  Grid,
} from '@material-ui/core'
import { Controller } from 'react-hook-form'

const CarouselCard = ({ card, control }) => {
  const descriptionMaxLength = 250
  const { logo, alt, organization, description, links } = card

  return (
    <Card
      data-cy='carousel-card-form'
      elevation={0}
      variant='outlined'
      style={styles.card}>
      <Grid container direction='column' spacing={3}>
        <Grid item container style={{ height: '150px' }}>
          <CardMedia
            style={styles.logo}
            data-cy='image-preview'
            component='img'
            src={logo}
          />
        </Grid>
        <Grid item>
          <Controller
            name='alt'
            control={control}
            defaultValue={alt}
            rules={{ required: 'This field cannot be empty' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                data-cy='alt-input'
                label={`Logo Alt attribute*`}
                error={!!error}
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
            name='organization'
            control={control}
            defaultValue={organization}
            rules={{ required: 'This field cannot be empty' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                data-cy='organization-input'
                label={`Organization name*`}
                variant='outlined'
                error={!!error}
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
            name='description'
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
            name='web-link'
            control={control}
            defaultValue={links.web}
            render={({ field: { onChange, value } }) => (
              <TextField
                data-cy='web-link-input'
                label={`Link to website*`}
                fullWidth
                value={value}
                onChange={onChange}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            name='facebook-link'
            control={control}
            defaultValue={links.web}
            render={({ field: { onChange, value } }) => (
              <TextField
                data-cy='facebook-link-input'
                label={`Link to Facebook*`}
                fullWidth
                value={value}
                onChange={onChange}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            name='twitter-link'
            control={control}
            defaultValue={links.web}
            render={({ field: { onChange, value } }) => (
              <TextField
                data-cy='twitter-link-input'
                label={`Link to Twitter*`}
                fullWidth
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

const styles = {
  card: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '200px',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop: '1rem',
  },
  buttonContainer: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: '20px',
  },
  logo: {
    margin: 'auto',
    maxHeight: '90%',
    maxWidth: '90%',
    objectFit: 'contain',
  },
}
