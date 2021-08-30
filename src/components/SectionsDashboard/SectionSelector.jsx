import React from 'react'
import SectionRegularForm from './SectionRegularForm'
import SectionNoImageForm from './SectionNoImageForm'
import SectionCarousel from './SectionCarousel'

const SectionSelector = ({ section, index }) => {
  const selector = (variant) => {
    switch (variant) {
      case 'regular':
        return (
          <SectionRegularForm
            id={section.id}
            key={`section-regular-${section.id}`}
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
            key={`section-no-image-${section.id}`}
            variant={variant}
            header={section.header}
            description={section.description}
            index={index}
          />
        )
      case 'carousel':
        return (
          <SectionCarousel
            id={section.id}
            key={`section-carousel-${section.id}`}
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
            key={`section-regular-${section.id}`}
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
