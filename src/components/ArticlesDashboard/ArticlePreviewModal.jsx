import React, { useState } from 'react'
import {
  Button,
  Modal,
  Typography,
  Container,
  Divider,
  Grid,
  CardMedia,
} from '@material-ui/core'

import Articles from '../../modules/Articles'
import articlePreview from '../../theme/articlePreviewTheme'

const ArticlePreviewModal = ({ article }) => {
  const classes = articlePreview()
  const [open, setOpen] = useState(false)
  const [preview, setPreview] = useState({})

  const getArticle = async () => {
    let response = await Articles.show(article.id)
    setPreview(response)
  }

  const handleOpen = () => {
    getArticle()
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <Button
        data-cy='article-preview-button'
        type='button'
        variant='contained'
        color='primary'
        onClick={handleOpen}>
        Preview
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className={classes.modal}>
        <Container
          data-cy='article-container'
          className={classes.articleContainer}>
          <Typography component='h5' variant='h4' data-cy='title'>
            {preview.title}
          </Typography>
          <Grid
            container
            justify='space-between'
            className={classes.information}>
            <Grid item>
              <Typography
                component='p'
                variant='subtitle1'
                data-cy='author'>{`Written by: ${preview.author}`}</Typography>
            </Grid>
            <Grid item>
              <Typography component='p' variant='subtitle1' data-cy='date'>
                {preview.date}
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
            src={preview.image?.url}
            alt={preview.image?.alt}
          />
          <Typography
            component='p'
            variant='body1'
            data-cy='body'
            className={classes.body}>
            {preview.body}
          </Typography>
          <Button
            className={classes.closeBtn}
            variant='contained'
            color='primary'
            data-cy='close-btn'
            type='button'
            onClick={handleClose}>
            Close
          </Button>
        </Container>
      </Modal>
    </>
  )
}

export default ArticlePreviewModal
