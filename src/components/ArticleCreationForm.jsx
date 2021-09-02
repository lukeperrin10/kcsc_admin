import React from 'react'
import { TextField, Box, Button } from '@material-ui/core'
import ImageUploader from '../components/ImageUploader'
import articleCreationTheme from '../theme/articleCreationTheme'

const ArticleCreationForm = ({
  handleSubmit,
  handleChange,
  article,
  setArticle,
}) => {
  const classes = articleCreationTheme()

  return (
    <form
      noValidate
      autoComplete='off'
      className={classes.formGroup}
      data-cy='new-article-modal'
      onSubmit={handleSubmit}>
      <TextField
        className={classes.form}
        data-cy='article-title'
        variant='outlined'
        fullWidth
        required
        id='standard-required'
        label='Title'
        type='string'
        name='title'
        onChange={handleChange}
      />

      <TextField
        className={classes.form}
        data-cy='article-body'
        variant='outlined'
        fullWidth
        required
        multiline
        minRows={8}
        id='standard-required'
        label='Body'
        type='text'
        name='body'
        onChange={handleChange}
      />

      <ImageUploader
        article={article}
        setArticle={setArticle}
        handleChange={(event) => handleChange(event)}
      />

      <Box className={classes.btnBox}>
        <Button
          data-cy='article-submit'
          variant='contained'
          type='submit'
          color='primary'>
          Submit
        </Button>
      </Box>
    </form>
  )
}

export default ArticleCreationForm
