import React, { useState } from 'react'
import { Button, Modal, Typography } from '@material-ui/core'
import Articles from '../../modules/Articles'

const ArticlePreviewModal = ({ article }) => {
  const [open, setOpen] = useState(false)
  const [preview, setPreview] = useState({})

  const getArticle = async () => {
    let response = await Articles.show(article.id)
    debugger
    setPreview(response)
    debugger
  }

  const handleOpen = () => {
    getArticle()
    setOpen(true)
  }
  return (
    <div>
      <Button
        data-cy='article-preview-button'
        type='button'
        onClick={handleOpen}>
        Preview
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div>
          <Typography>{preview.title}</Typography>
          <Typography>{preview.body}</Typography>
          <Typography>{preview.author}</Typography>
          
        </div>
      </Modal>
    </div>
  )
}

export default ArticlePreviewModal
