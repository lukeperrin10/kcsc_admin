import React, { useState } from 'react'
import {
  Button,
  Modal,
  Typography,
  Container,
  Divider,
  Grid,
  CardMedia,
  TextField,
  ButtonGroup,
  IconButton,
} from '@material-ui/core'

import Articles from '../../modules/Articles'
import articlePreview from '../../theme/articlePreviewTheme'
import { PhotoCamera } from '@material-ui/icons'

const ArticlePreviewModal = ({ article }) => {
  const classes = articlePreview()
  const [open, setOpen] = useState(false)
  const [currentArticle, setCurrentArticle] = useState({})
  const [changeMode, setChangeMode] = useState(false)

  const getArticle = async () => {
    let response = await Articles.show(article.id)
    setCurrentArticle(response)
  }

  const handleOpen = () => {
    getArticle()
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    Articles.update(article)
  }
  return (
    <>
      <ButtonGroup
        size='small'
        orientation='vertical'
        variant='contained'
        color='primary'>
        <Button
          data-cy='article-preview-button'
          type='button'
          name='preview'
          onClick={() => handleOpen(setChangeMode(false))}>
          Preview
        </Button>
        <Button
          data-cy='article-edit-button'
          type='button'
          name='edit'
          onClick={() => {
            handleOpen(setChangeMode(true))
          }}>
          Edit
        </Button>
      </ButtonGroup>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className={classes.modal}>
        <Container
          data-cy='article-container'
          className={classes.articleContainer}>
          {changeMode ? (
            <TextField
              data-cy='article-title'
              label='Title'
              fullWidth
              defaultValue={currentArticle.title}
            />
          ) : (
            <Typography component='h5' variant='h4' data-cy='title'>
              {currentArticle.title}
            </Typography>
          )}

          <Grid
            container
            justify='space-between'
            className={classes.information}>
            <Grid item>
              <Typography
                component='p'
                variant='subtitle1'
                data-cy='author'>{`Written by: ${currentArticle.author}`}</Typography>
            </Grid>
            <Grid item>
              <Typography component='p' variant='subtitle1' data-cy='date'>
                {currentArticle.date}
              </Typography>
            </Grid>
          </Grid>
          <Divider
            className={classes.divider}
            orientation='horizontal'
            variant='fullWidth'
          />
          <CardMedia
            className={classes.image}
            data-cy='image'
            component='img'
            src={currentArticle.image?.url}
            alt={currentArticle.image?.alt}
          />
          {changeMode && <>
          </>}
          {changeMode ? (
            <TextField
              label='Main body'
              data-cy='article-body'
              multiline
              fullWidth
              defaultValue={currentArticle.body}
            />
          ) : (
            <Typography
              component='p'
              variant='body1'
              data-cy='body'
              className={classes.body}>
              {currentArticle.body}
            </Typography>
          )}

          <ButtonGroup size='small' variant='text' color='primary'>
            <Button
              className={classes.closeBtn}
              variant='contained'
              color='primary'
              data-cy='close-btn'
              type='button'
              onClick={handleClose}>
              Close
            </Button>
            {changeMode && (
              <Button
                className={classes.closeBtn}
                variant='contained'
                color='primary'
                type='button'
                data-cy='submit-button'
                onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </ButtonGroup>
        </Container>
      </Modal>
    </>
  )
}

export default ArticlePreviewModal
