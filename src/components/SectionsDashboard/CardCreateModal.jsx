import React from 'react'
import CarouselCardForm from './CarouselCardForm'
import {
  Modal,
  Container,
} from '@material-ui/core'

const CardCreateModal = ({ open, setOpen, sectionSubmit }) => {
  const emptyCard = {
    id: null,
    publish: null,
    logo: null,
    alt: null,
    organization: null,
    description: null,
    links: {
      web: null,
      facebook: null,
      twitter: null,
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
