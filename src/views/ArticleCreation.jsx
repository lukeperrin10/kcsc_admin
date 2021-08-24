import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import Articles from '../modules/Articles'
import ArticleCreationForm from '../components/ArticleCreationForm'
import SuccessSnackbar from '../components/popups/SuccessSnackbar'

const newArticle = {
  title: '',
  body: '',
}
const ArticleCreation = () => {
  const [redirect, setRedirect] = useState(false);
  const [article, setArticle] = useState(newArticle)

  const handleChange = (event) => {
    setArticle({
      ...article,
      [event.target.name]: event.target.value,
    })
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    Articles.create(article)
    setRedirect(true)
  }

  return (
    <>

      <SuccessSnackbar />
      {redirect && <Redirect to='/articles' />}
      <ArticleCreationForm
        handleSubmit={handleSubmit}
        handleChange={(event) => handleChange(event)}
      />
    </>
  )
}

export default ArticleCreation

// const handleImage = async (event) => {
//   let file = event.target.files[0]
//   setThumbnail(file)
//   let encodedFile = await imageEncoder(file)
//   setArticle({
//     ...article,
//     image: encodedFile,
//   })
// }
