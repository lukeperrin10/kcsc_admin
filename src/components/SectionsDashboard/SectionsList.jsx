import React, { useEffect, useState } from 'react'
import Sections from '../../modules/Sections'

const SectionsList = ({ tabValue }) => {
  const [sections, setSections] = useState([])

  useEffect(() => {
    const getSections = async (tabValue) => {
      let response = await Sections.index(tabValue)
      setSections(response)
    }
    getSections(tabValue)
  }, [tabValue])

  const sectionList = sections.map((section) => {
    return (
      <div style={{margin: '30px'}}>
        <h1>{section.header}</h1>
        <h3>{section.variant}</h3>
        <p>{section.description}</p>
      </div>
    )
  })
  return <div>{sectionList}</div>
}

export default SectionsList
