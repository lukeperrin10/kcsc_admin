import React, { useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useForm } from 'react-hook-form'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
} from '@material-ui/core'
import useCommonStyles from '../../theme/useCommonStyles'
import AppData from '../../modules/AppData'
import SubmitButton from '../SubmitButton'
import TabFormSection from './TabFormSection'

const NavigationForm = ({ mainTabs }) => {
  const [expanded, setExpanded] = useState(true)
  const { control, handleSubmit } = useForm()
  const commonClasses = useCommonStyles()

  const onSubmit = ({ navigation }) => {    
    const attributes = AppData.toNavigationObject(navigation)
    AppData.update(attributes)
  }

  const mainTabsList = mainTabs.map((mainTab, index) => {
    let secondaryTabList = <></>
    if (mainTab.secondary_tabs) {
      secondaryTabList = mainTab.secondary_tabs.map(
        (secondaryTab, indexSec) => (
          <TabFormSection
            key={`secondary-${index}.${indexSec}`}
            control={control}
            index={index + 1}
            indexSec={indexSec + 1}
            label={secondaryTab.label}
            visible={mainTab.visible && secondaryTab.visible}
            secondary={true}
            section={secondaryTab.ref}
          />
        )
      )
    }

    return (
      <Grid
        item
        container
        direction='column'
        spacing={3}
        key={`nav-form-row-${index}`}
        style={{ maxWidth: '600px' }}>
        <TabFormSection
          control={control}
          index={index + 1}
          label={mainTab.label}
          visible={mainTab.visible}
        />
        {secondaryTabList && secondaryTabList}
      </Grid>
    )
  })

  return (
    <form data-cy='navigation-form' onSubmit={handleSubmit(onSubmit)}>
      <Accordion
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h6'>Navigation</Typography>
        </AccordionSummary>

        <AccordionDetails className={commonClasses.accordionDetails}>
          <Grid container direction='column' spacing={3}>
            {mainTabsList}
            <SubmitButton dataCy='navigation-submit-button' />
          </Grid>
        </AccordionDetails>
      </Accordion>
    </form>
  )
}

export default NavigationForm
