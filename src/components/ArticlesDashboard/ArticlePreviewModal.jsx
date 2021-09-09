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
} from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import Articles from '../../modules/Articles'
import articlePreview from '../../theme/articlePreviewTheme'
import ImageUploader from '../ImageUploader'
import SubmitButton from '../SubmitButton'

const ArticlePreviewModal = ({ article, editArticle }) => {
  const classes = articlePreview()
  const [open, setOpen] = useState(false)
  const [currentArticle, setCurrentArticle] = useState()
  const [changeMode, setChangeMode] = useState(false)
  const [imageVisible, setImageVisible] = useState(true)
  const [alt, setAlt] = useState()
  const { control, handleSubmit } = useForm()

  const getArticle = async () => {
    let response = await Articles.show(article.id)
    setCurrentArticle(response.article)
  }

  const handleOpen = () => {
    getArticle()
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (event) => {
    setAlt(event.target.value)
  }

  const onSubmit = async (attributes) => {
    const fromData = {
      article: {
        ...attributes,
        image: currentArticle.image.url ? currentArticle.image.url : currentArticle.image,
        alt: alt,
        id: currentArticle.id,
      },
    }
    try {
      await Articles.update(fromData)
      setOpen(false)
    } catch {}
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

      {currentArticle && (
        <>
          <Modal open={open} className={classes.modal}>
            <Container
              data-cy='article-container'
              className={classes.articleContainer}>
              <form
                onSubmit={handleSubmit((attributes) => onSubmit(attributes))}>
                {changeMode ? (
                  <Controller
                    name='title'
                    control={control}
                    defaultValue={currentArticle.title}
                    rules={{ required: 'This field cannot be empty' }}
                    render={({
                      field: { onChange, value },  
                    }) => (
                      <TextField
                        data-cy='article-title'
                        label='Title'
                        fullWidth
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                ) : (
                  <Typography component='h5' variant='h4' data-cy='title'>
                    {currentArticle.title}
                  </Typography>
                )}

                <Grid
                  container
                  justifyContent='space-between'
                  className={classes.information}>
                  <Grid item>
                    <Typography
                      component='p'
                      variant='subtitle1'
                      data-cy='author'>{`Written by: ${currentArticle.author?.name}`}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      component='p'
                      variant='subtitle1'
                      data-cy='date'>
                      {currentArticle.date}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider
                  className={classes.divider}
                  orientation='horizontal'
                  variant='fullWidth'
                />

                {imageVisible && (
                  <CardMedia
                    className={classes.image}
                    data-cy='image'
                    component='img'
                    src={currentArticle.image?.url}
                    alt={currentArticle.image?.alt}
                  />
                )}

                {changeMode && (
                  <>
                    <ImageUploader
                      article={currentArticle}
                      setArticle={setCurrentArticle}
                      editArticle={() => editArticle(true)}
                      setImageVisible={setImageVisible}
                      handleChange={handleChange}
                    />
                  </>
                )}
                {changeMode ? (
                  <Controller
                    name='body'
                    control={control}
                    defaultValue={currentArticle.body}
                    rules={{ required: 'This field cannot be empty' }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        label='Main body'
                        data-cy='article-body'
                        multiline
                        fullWidth
                        value={value}
                        onChange={onChange}
                      />
                    )}
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

                <ButtonGroup
                  className={classes.buttonsContainer}
                  size='small'
                  variant='text'
                  color='primary'>
                  <Button
                    className={classes.closeBtn}
                    variant='contained'
                    color='primary'
                    data-cy='close-btn'
                    type='button'
                    onClick={handleClose}>
                    Close
                  </Button>
                  {changeMode && <SubmitButton dataCy='submit-button' />}
                </ButtonGroup>
              </form>
            </Container>
          </Modal>
        </>
      )}
    </>
  )
}

export default ArticlePreviewModal
