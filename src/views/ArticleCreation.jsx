import React, { useState } from 'react'

import Articles, { imageEncoder } from '../modules/Articles'
import ArticleCreationForm from '../components/ArticleCreationForm'

const newArticle = {
  title: '',
  teaser: '',
  body: '',
  author: '',
}

const ArticleCreation = () => {
  const [article, setArticle] = useState(newArticle)

  const handleSubmit = async () => {
    Articles.create(article)
  }

  return <ArticleCreationForm handleSubmit={handleSubmit} />
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
