import React, { useEffect, useState } from 'react'
import { Box, makeStyles } from '@material-ui/core'
import Sections from '../../modules/Sections'
import SectionSelector from './SectionSelector'

const useStyles = makeStyles((theme) => ({
  section: {
    backgroundColor: '#fff',
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))

const SectionsList = ({ tabValue }) => {
  const [sections, setSections] = useState([])
  const classes = useStyles()

  useEffect(() => {
    const getSections = async (tabValue) => {
      let response = await Sections.index(tabValue)
      setSections(response)
    }
    getSections(tabValue)
    return setSections([])
  }, [tabValue])

  const sectionList = sections.map((section, index) => {
    return (
      <Box key={`section-${index}`} className={classes.section}>
        <SectionSelector
          key={`section-${index}`}
          index={index + 1}
          section={section}
        />
      </Box>
    )
  })
  return <div>{sectionList}</div>
}

export default SectionsList
