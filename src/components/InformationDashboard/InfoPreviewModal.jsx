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

import Information from '../../modules/Information'
import infoPreview from '../../theme/infoPreviewTheme'

const InfoPreviewModal = ({ informationItem }) => {
  const classes = infoPreview()
  const [open, setOpen] = useState(false)
  const [currentInformation, setCurrentInformation] = useState()
  const headerMaxLength = 40
  const descriptionMaxLength = 300

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

  const handleSubmit = () => {
    Information.update(informationItem)
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
            <Card className={classes.fullHeight}>
              <Grid container direction='row' className={classes.fullHeight}>
                <Grid item xs={12}>
                  <CardContent className={classes.cardContent}>
                    <TextField
                      className={classes.contentField}
                      label={`Header (max ${headerMaxLength} char.)*`}
                      data-cy='info-header'
                      fullWidth
                      multiline
                      variant='outlined'
                      inputProps={{ maxLength: headerMaxLength }}
                      defaultValue={currentInformation.header}
                    />
                    <TextField
                      className={classes.contentField}
                      label={`Description (max ${descriptionMaxLength} char.)*`}
                      data-cy='info-description'
                      multiline
                      fullWidth
                      minRows={2}
                      variant='outlined'
                      inputProps={{ maxLength: descriptionMaxLength }}
                      defaultValue={currentInformation.description}
                    />
                    <TextField
                      className={classes.contentField}
                      label='Link'
                      data-cy='info-link'
                      multiline
                      fullWidth
                      variant='outlined'
                      defaultValue={currentInformation.link}
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
                  type='button'
                  data-cy='submit-button'
                  onClick={handleSubmit}>
                  Submit
                </Button>
              </Box>
            </Card>
          </Container>
        </Modal>
      )}
    </>
  )
}

export default InfoPreviewModal
