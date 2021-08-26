import React, { useState } from 'react'
import { CardMedia, makeStyles, Button } from '@material-ui/core'
import { imageEncoder } from '../modules/ImageEncoder'

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
  image: {
    margin: "10px 0 50px 0",
    maxHeight: '500px',
    maxWidth: '500px',
  },
}))

const ImageUploader = () => {
  const classes = useStyles()
  const [image, setImage] = useState({})
  const [preview, setPreview] = useState()

  const handleImage = async (event) => {
    let file = event.target.files[0]
    setPreview(file)
    let encodedFile = await imageEncoder(file)
    setImage({
      ...image,
      image: encodedFile,
    })
  }

  return (
    <>
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
        <Button variant='contained' color='primary' component='span' data-cy="upload-image-btn">
          Upload Image
        </Button>
      </label>
    </>
  )
}

export default ImageUploader
