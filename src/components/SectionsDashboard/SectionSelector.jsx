import React from 'react'
import SectionRegularForm from './SectionRegularForm'
import SectionNoImageForm from './SectionNoImageForm'
import SectionCarouselForm from './SectionCarouselForm'

const SectionSelector = ({ section }) => {
  const selector = (variant) => {
    switch (variant) {
      case 'regular':
        return (
          <SectionRegularForm
            id={section.id}
            variant={variant}
            header={section.header}
            description={section.description}
            image={section.image}
            buttons={section.buttons}
          />
        )
      case 'no_image':
        return (
          <SectionNoImageForm
            id={section.id}
            variant={variant}
            header={section.header}
            description={section.description}
          />
        )
      case 'carousel':
        return (
          <SectionCarouselForm
            id={section.id}
            variant={variant}
            header={section.header}
            cards={section.cards}
          />
        )
      default:
        return (
          <SectionRegularForm
            id={section.id}
            variant={variant}
            header={section.header}
            description={section.description}
            image={section.image}
            buttons={section.buttons}
          />
        )
    }
  }

  return <>{selector(section.variant)}</>
}

export default SectionSelector
