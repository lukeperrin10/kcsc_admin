import React, { useState } from 'react'
import { TextField, Box, Button, CardMedia } from '@material-ui/core'
import { DropzoneArea } from 'material-ui-dropzone'
import articleCreationTheme from '../theme/articleCreationTheme'

import Articles, { imageEncoder } from '../modules/Articles'

const newArticle = {
  title: '',
  teaser: '',
  body: '',
  author: '',
}

const ArticleCreation = () => {
  const [article, setArticle] = useState(newArticle)
  const [thumbnail, setThumbnail] = useState()

  const classes = articleCreationTheme()
  const handleSubmit = async () => {
    Articles.create(article)
  }

  const handleImage = async (event) => {
    let file = event.target.files[0]
    setThumbnail(file)
    let encodedFile = await imageEncoder(file)
    setArticle({
      ...article,
      image: encodedFile,
    })
  }
  return (
    <div>
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
          data-cy='article-teaser'
          required
          id='standard-required'
          label='Teaser'
        />
        <TextField
          className={classes.form}
          data-cy='article-body'
          required
          multiline
          id='standard-required'
          label='Body'
        />
        <TextField
          className={classes.form}
          data-cy='article-author'
          required
          id='standard-required'
          label='Author'
        />
        <TextField
          className={classes.form}
          data-cy='article-date'
          required
          id='standard-required'
          label='Date'
        />
        <DropzoneArea
          data-cy='article-image'
          acceptedFiles={['image/*']}
          dropzoneText='Drag and drop or click here to add images'
          filesLimit={1}
        />

        <Box className={classes.btnBox}>
          <Button className={classes.submit} data-cy='article-submit' type='submit'>
            Submit
          </Button>
          <Button
            className={classes.cancel}
            data-cy='cancel-btn'
            Cancel></Button>
        </Box>
      </form>
    </div>
  )
}

export default ArticleCreation
