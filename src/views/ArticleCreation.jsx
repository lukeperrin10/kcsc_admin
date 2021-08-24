import React, { useState } from 'react'
import Articles from '../modules/Articles'
import ArticleCreationForm from '../components/ArticleCreationForm'

const newArticle = {
  title: '',
  body: '',
}
const ArticleCreation = () => {
  const [article, setArticle] = useState(newArticle)

  const handleChange = (event) => {
    setArticle({
      ...article,
      [event.target.name]: event.target.value,
    })
  }
  const handleSubmit = async () => {
    Articles.create(article)
  }

  return (
    <ArticleCreationForm
      handleSubmit={handleSubmit}
      handleChange={(event) => handleChange(event)}
    />
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
