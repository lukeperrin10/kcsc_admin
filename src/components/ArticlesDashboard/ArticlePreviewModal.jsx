import React, { useState } from 'react'
import { Box, Button, Modal, Typography, withStyles } from '@material-ui/core'
import Articles from '../../modules/Articles'
import modalTheme from '../../theme/modalTheme'
import theme from '../../theme/theme'

const ArticlePreviewModal = ({ article }) => {
  const [open, setOpen] = useState(false)
  const [preview, setPreview] = useState({})
  const modalClasses = modalTheme()


  const getArticle = async () => {
    let response = await Articles.show(article.id)
    setPreview(response)
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
        <div className={modalClasses.viewContainer}>
          <Typography className={modalClasses.articleTitle}>{preview.title}</Typography>
          <Typography>{preview.body}</Typography>
        </div>
      </Modal>
    </div>
  )
}

export default ArticlePreviewModal
