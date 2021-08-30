import React from 'react'
import CarouselCardForm from './CarouselCardForm'
import {
  Modal,
  Container,
} from '@material-ui/core'

const CardCreateModal = ({ open, setOpen, sectionSubmit }) => {
  const emptyCard = {
    id: null,
    publish: '',
    logo: '',
    alt: '',
    organization: '',
    description: '',
    links: {
      web: '',
      facebook: '',
      twitter: '',
    },
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Modal open={open} style={{maxWidth: '600px', margin: 'auto', overflow: 'scroll'}}>
      <Container data-cy='create-card-modal-container'>
        <CarouselCardForm card={emptyCard} create={true} handleClose={handleClose} sectionSubmit={sectionSubmit}/>      
      </Container>
    </Modal>
  )
}

export default CardCreateModal
