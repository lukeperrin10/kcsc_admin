import React, { useState } from 'react'
import { Box, Button, Modal } from '@material-ui/core'
import Articles from '../../modules/Articles'

const ArticlePreviewModal = ({id}) => {
  const [open, setOpen] = useState(false)
  const [article, setArticle] = useState({})

  const getArticle = async () => {
    let response = await Articles.show(id)
    setArticle(response)
  }

  const handleOpen = () => {
    setOpen(true)
    getArticle()
  }
  return (
    <div>
      <Button type='button' onClick={handleOpen}></Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box>{article.title}</Box>
        <Box>{article.body}</Box>
      </Modal>
    </div>
  )
}

export default ArticlePreviewModal
