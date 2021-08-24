import React from 'react'
import { TextField, Box, Button, CardMedia } from '@material-ui/core'
import { DropzoneArea } from 'material-ui-dropzone'
import articleCreationTheme from '../theme/articleCreationTheme'

const ArticleCreationForm = ({ handleSubmit }) => {
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
        required
        id='standard-required'
        label='Title'
      />

      <TextField
        className={classes.form}
        data-cy='article-body'
        required
        multiline
        id='standard-required'
        label='Body'
      />
      <DropzoneArea
        data-cy='article-image'
        acceptedFiles={['image/*']}
        dropzoneText='Drag and drop or click here to add images'
        filesLimit={1}
      />

      <Box className={classes.btnBox}>
        <Button
          className={classes.submit}
          data-cy='article-submit'
          type='submit'>
          Submit
        </Button>
        <Button className={classes.cancel} data-cy='cancel-btn' Cancel></Button>
      </Box>
    </form>
  )
}

export default ArticleCreationForm
