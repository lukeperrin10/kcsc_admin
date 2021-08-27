import React from 'react'
import SectionRegularForm from './SectionRegularForm'
import SectionNoImageForm from './SectionNoImageForm'
import SectionCarouselForm from './SectionCarouselForm'

const SectionSelector = ({ section, index }) => {
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
            index={index}
          />
        )
      case 'no_image':
        return (
          <SectionNoImageForm
            id={section.id}
            variant={variant}
            header={section.header}
            description={section.description}
            index={index}
          />
        )
      case 'carousel':
        return (
          <SectionCarouselForm
            id={section.id}
            variant={variant}
            header={section.header}
            cards={section.cards}
            index={index}
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
