import React, {useEffect, useState} from 'react'
import Section from '../../modules/Section'

const SectionsList = ({tabValue}) => {
const [sections, setSections] = useState([])

  useEffect(() => {
    const getSections = async (tabValue) => {
      let response = await Section.index(tabValue)
      setSections(response)
    }
    getSections(tabValue)
  }, [tabValue])

  return (
    <div>
      {`Sections List from ${tabValue}`}
    </div>
  )
}

export default SectionsList
