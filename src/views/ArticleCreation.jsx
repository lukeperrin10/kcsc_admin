import React from 'react'

import Articles, { imageEncoder } from '../modules/Articles'

const newArticle = {
  title: '',
  teaser: '',
  body: '',
  author: '',
}

const ArticleCreation = () => {
  return (
    <div>
      
    </div>
  )
}

export default ArticleCreation













// const modalStyle = articleDashboard()
//   const [openModal, setOpenModal] = useState(false)
//   const [article, setArticle] = useState(newArticle)
//   const [thumbnail, setThumbnail] = useState()

// {/* <Button
// data-cy='new-article-btn'
// className={classes.newArticleBtn}
// onClick={handleOpenModal}>
// Create new article
// </Button> 
// <Modal
//   disableBackdropClick={true} //Deprecated look in to
//               className={classes.modal}
//               open={openModal}
//               onClose={handleCloseModal}
//               aria-labelledby='create new article'
//               aria-describedby='opens a modal to create a new article'>
//               {body}
//             </Modal> */}


            // const handleOpenModal = () => {
            //   setOpenModal(true)
            // }
          
            // const handleCloseModal = () => {
            //   setOpenModal(false)
            // }
          
            // const handleSubmit = async () => {
            //   Articles.create(article)
            // }
          
            // const handleImage = async (event) => {
            //   let file = event.target.files[0]
            //   setThumbnail(file)
            //   let encodedFile = await imageEncoder(file)
            //   setArticle({
            //     ...article,
            //     image: encodedFile,
            //   })
            // }
          
            // const body = (
            //   <form
            //     noValidate
            //     autoComplete='off'
            //     className={classes.formGroup}
            //     data-cy='new-article-modal'
            //     onSubmit={handleSubmit}>
            //     <TextField
            //       className={classes.form}
            //       data-cy='title-input'
            //       required
            //       id='standard-required'
            //       label='Title'
            //     />
            //     <TextField
            //       className={classes.form}
            //       data-cy='teaser-input'
            //       required
            //       id='standard-required'
            //       label='Teaser'
            //     />
            //     <TextField
            //       className={classes.form}
            //       data-cy='body-input'
            //       required
            //       multiline
            //       id='standard-required'
            //       label='Body'
            //     />
            //     <TextField
            //       className={classes.form}
            //       data-cy='author-input'
            //       required
            //       id='standard-required'
            //       label='Author'
            //     />
            //     <Box>
            //       <input
            //         accept='image/*'
            //         className={classes.input}
            //         id='contained-button-file'
            //         multiple
            //         type='file'
            //         onChange={(event) => handleImage(event)}
            //       />
            //       <label htmlFor='contained-button-file'>
            //         <Button variant='contained' color='#fff' component='span'>
            //           Upload Image
            //         </Button>
            //       </label>
            //       <Box>
            //         {article.image ? (
            //           <CardMedia
            //             className={classes.thumbnailContainer}
            //             data-cy='thumbnail'
            //             component='img'
            //             image={thumbnail ? URL.createObjectURL(thumbnail) : article.image}
            //             alt='thumbnail'
            //           />
            //         ) : (
            //           <Box>
            //             <p style={{ fontSize: 20, color: 'white' }}>Thumbnail</p>
            //           </Box>
            //         )}
            //       </Box>
            //     </Box>
            //     <Box className={classes.btnBox}>
            //       <Button className={classes.submit} data-cy='submit-btn' type='submit'>
            //         Submit
            //       </Button>
            //       <Button
            //         className={classes.cancel}
            //         data-cy='cancel-btn'
            //         onClick={handleCloseModal}>
            //         Cancel
            //       </Button>
            //     </Box>
            //   </form>
            // )