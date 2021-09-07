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
        onClick={() => {
          handleOpen()
        }}>
        Edit
      </Button>
      {currentInformation && (
        <Modal open={open} className={classes.modal}>
          <Container data-cy='info-container' className={classes.card}>
            <Card elevation={2} className={classes.fullHeight}>
              <Grid container direction='row' className={classes.fullHeight}>
                <Grid item sm={10} xs={11}>
                  <CardContent className={classes.cardContent}>
                    <TextField
                      className={classes.contentField}
                      label='Header'
                      data-cy='info-header'
                      fullWidth
                      multiline
                      defaultValue={currentInformation.header}
                    />
                    <TextField
                      className={classes.contentField}
                      label='Description'
                      data-cy='info-description'
                      multiline
                      fullWidth
                      defaultValue={currentInformation.description}
                    />
                    <TextField
                      className={classes.contentField}
                      label='Link'
                      data-cy='info-link'
                      multiline
                      fullWidth
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
