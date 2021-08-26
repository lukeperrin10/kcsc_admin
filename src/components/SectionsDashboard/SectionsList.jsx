import React, { useEffect, useState } from 'react'
import Sections from '../../modules/Sections'
import SectionSelector from './SectionSelector'

const SectionsList = ({ tabValue }) => {
  const [sections, setSections] = useState([])

  useEffect(() => {
    const getSections = async (tabValue) => {
      let response = await Sections.index(tabValue)
      setSections(response)
    }
    getSections(tabValue)
  }, [tabValue])

  const sectionList = sections.map((section, index) => {
    return <SectionSelector key={`section-${index}`} index={index+1} section={section} />
  })
  return <div>{sectionList}</div>
}

export default SectionsList
