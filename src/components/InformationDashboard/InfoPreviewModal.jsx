import React, { useState } from 'react'
import {
  Button,
  Modal,
  Container,
  TextField,
  Card,
  Grid,
  CardContent,
  Box,
} from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'
import Information from '../../modules/Information'
import infoPreview from '../../theme/infoPreviewTheme'


const InfoPreviewModal = ({ informationItem }) => {
  const classes = infoPreview()
  const [open, setOpen] = useState(false)
  const [currentInformation, setCurrentInformation] = useState()
  const { control, handleSubmit } = useForm()
  const headerMaxLength = 600
  const descriptionMaxLength = 1200

  const getInformation = async () => {
    let response = await Information.show(informationItem.id)
    setCurrentInformation(response)
  }

  const handleOpen = () => {
    getInformation()
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit = (formData) => {
    Information.update(formData, informationItem.id)
    setOpen(false)
  }

  return (
    <>
      <Button
        data-cy='edit-button'
        type='button'
        name='edit'
        variant='contained'
        color='primary'
        onClick={() => {
          handleOpen()
        }}>
        Edit
      </Button>
      {currentInformation && (
        <Modal open={open} className={classes.modal}>
          <Container data-cy='info-container' className={classes.card}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Card className={classes.fullHeight}>
                <Grid container direction='row' className={classes.fullHeight}>
                  <Grid item xs={12}>
                    <CardContent className={classes.cardContent}>
                      <Controller
                        name='header'
                        control={control}
                        defaultValue={currentInformation.header}
                        rules={{ required: 'This field cannot be empty' }}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <TextField
                            className={classes.contentField}
                            label={`Header (max ${headerMaxLength} char.)*`}
                            data-cy='info-header'
                            fullWidth
                            multiline
                            variant='outlined'
                            inputProps={{ maxLength: headerMaxLength }}
                            error={!!error}
                            helperText={error ? error.message : null}
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />

                      <Controller
                        name='description'
                        control={control}
                        defaultValue={currentInformation.description}
                        rules={{ required: 'This field cannot be empty' }}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <TextField
                            className={classes.contentField}
                            label={`Description (max ${descriptionMaxLength} char.)*`}
                            data-cy='info-description'
                            multiline
                            fullWidth
                            minRows={2}
                            variant='outlined'
                            inputProps={{ maxLength: descriptionMaxLength }}
                            error={!!error}
                            helperText={error ? error.message : null}
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />

                      <Controller
                        name='link'
                        control={control}
                        defaultValue={currentInformation.link}
                        rules={{ required: 'This field cannot be empty' }}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <TextField
                            className={classes.contentField}
                            label='Link'
                            data-cy='info-link'
                            multiline
                            fullWidth
                            variant='outlined'
                            error={!!error}
                            helperText={error ? error.message : null}
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />
                    </CardContent>
                  </Grid>
                </Grid>
                <Box className={classes.buttonsContainer}>
                  <Button
                    className={classes.closeBtn}
                    variant='contained'
                    color='primary'
                    data-cy='close-btn'
                    type='button'
                    onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    className={classes.closeBtn}
                    variant='contained'
                    color='primary'
                    type='submit'
                    data-cy='submit-button'
                    onClick={handleSubmit}>
                    Submit
                  </Button>
                </Box>
              </Card>
            </form>
          </Container>
        </Modal>
      )}
    </>
  )
}

export default InfoPreviewModal
