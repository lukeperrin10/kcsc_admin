import React, { useState } from 'react'
import { CardMedia, makeStyles, Button, TextField } from '@material-ui/core'
import { imageEncoder } from '../modules/ImageEncoder'

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
  image: {
    margin: '10px 0 50px 0',
    maxHeight: '500px',
    maxWidth: '500px',
  },
  form: {
    width: '70%',
    margin: '2% 2% 5% 2%',
  },
  uploadBtn: {
    marginBottom: '50px'
  }
}))

const ImageUploader = ({ handleChange, article, setArticle }) => {
  const classes = useStyles()
  const [preview, setPreview] = useState()

  const handleImage = async (event) => {
    let file = event.target.files[0]
    setPreview(file)
    let encodedFile = await imageEncoder(file)
    setArticle({
      ...article,
      image: encodedFile,
    })
  }

  return (
    <>
      <TextField
        className={classes.form}
        data-cy='alt'
        variant='outlined'
        required
        fullWidth
        id='standard-required'
        label='Image Alt'
        type='text'
        name='alt'
        onChange={handleChange}
      />
      <CardMedia
        className={classes.image}
        data-cy='image'
        component='img'
        src={preview && URL?.createObjectURL(preview)}
      />
      <input
        accept='image/*'
        className={classes.input}
        id='contained-button-file'
        type='file'
        onChange={(event) => handleImage(event)}
      />
      <label htmlFor='contained-button-file'>
        <Button
        className={classes.uploadBtn}
          variant='contained'
          color='primary'
          component='span'
          data-cy='upload-image-btn'>
          Upload Image
        </Button>
      </label>
    </>
  )
}

export default ImageUploader
