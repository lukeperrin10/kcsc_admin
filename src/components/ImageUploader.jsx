import React, { useState } from 'react'
import {
  CardMedia,
  makeStyles,
  Button,
  TextField,
  IconButton,
} from '@material-ui/core'
import { PhotoCamera } from '@material-ui/icons'
import useCommonStyles from '../theme/useCommonStyles'

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
  image: {
    margin: '10px 0 50px 0',
    maxHeight: '500px',
    maxWidth: '500px',
  },

  imageEdit: {
    marginBottom: '10px',
  },
  form: {
    width: '70%',
    margin: '2% 2% 5% 2%',
  },

  formEdit: {
    width: '90%',
    margin: '1% 1% 3% 2%',
  },

  uploadBtn: {
    marginBottom: '50px',
  },
  camera: {
    marginBottom: '20px',
  },
}))

const ImageUploader = ({
  handleChange,
  article,
  setArticle,
  editArticle,
  setImageVisible,
}) => {
  const classes = useStyles()
  const [preview, setPreview] = useState()
  const [updatedImage, setUpdatedImage] = useState(false)
  const commonClasses = useCommonStyles()

  const handleImage = async (event) => {
    event.preventDefault()
    let file = event.target.files[0]
    setPreview(file)
    let encodedFile = await imageEncoder(file)
    setArticle({
      ...article,
      image: encodedFile,
    })
    setImageVisible && setImageVisible()
    setUpdatedImage(true)
  }

  const imageEncoder = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      if (file) {
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
      }
      reader.onerror = (error) => reject(error)
    })

  return (
    <>
      {editArticle ? (
        <>
          <CardMedia
            className={classes.imageEdit}
            data-cy='image'
            component='img'
            src={preview && URL?.createObjectURL(preview)}
          />
          <input
            accept='image/*'
            className={classes.input}
            id='icon-button-file'
            type='file'
            onChange={(event) => {
              handleImage(event)
            }}
          />
          <TextField
            className={classes.formEdit}
            data-cy='alt'
            fullWidth
            multiline
            id='standard-required'
            placeholder='Enter descriptive text of new image'
            type='text'
            name='alt'
            defaultValue={article.image?.alt}
            onChange={handleChange}
            helperText={
              updatedImage &&
              'Please make sure to update the alternative text for the image!'
            }
          />
          <label htmlFor='icon-button-file'>
            <IconButton
              data-cy='upload-image-camera'
              color='primary'
              component='span'
              className={classes.camera}>
              <PhotoCamera />
            </IconButton>
          </label>
        </>
      ) : (
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
            className={commonClasses.image}
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
      )}
    </>
  )
}

export default ImageUploader
