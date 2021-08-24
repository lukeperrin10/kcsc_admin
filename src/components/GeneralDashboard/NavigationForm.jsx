import React, { useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Controller, useForm } from 'react-hook-form'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Grid,
  Button,
  Switch,
  FormControlLabel,
} from '@material-ui/core'
import useCommonStyles from '../../theme/useCommonStyles'
import AppData from '../../modules/AppData'
import SubmitButton from '../SubmitButton'
import TabFormSection from './TabFormSection'

const NavigationForm = ({ mainTabs, secondaryTabs }) => {
  const [expanded, setExpanded] = useState({ footer: true })
  const { control, handleSubmit } = useForm()
  const commonClasses = useCommonStyles()
  const labelMaxLength = 50

  const onSubmit = ({ navigation }) => {
    // let attributes = {
    //   navigation: navigation,
    // }
    // AppData.update(attributes)
  }

  const mainTabsList = mainTabs.map((mainTab, index) => {
    let secondaryTabList = <></>
    if (mainTab.secondary_tabs) {
      secondaryTabList = mainTab.secondary_tabs.map(
        (secondaryTab, indexSec) => (
          <TabFormSection
            index={`${index+1}.${indexSec+1}`}
            label={secondaryTab.label}
            visible={secondaryTab.visible}
            secondary={true}
          />
        )
      )
    }

    return (
      <Grid item container direction='column' spacing={3} style={{width: '50%'}}>
        <TabFormSection
          index={index+1}
          label={mainTab.label}
          visible={mainTab.visible}
        />
        {secondaryTabList && secondaryTabList}
      </Grid>
    )
  })

  return (
    <form data-cy='footer-form' onSubmit={handleSubmit(onSubmit)}>
      <Accordion
        expanded={expanded.footer}
        onChange={() => setExpanded({ ...expanded, footer: !expanded.footer })}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant='h6'>Navigation</Typography>
        </AccordionSummary>

        <AccordionDetails className={commonClasses.accordionDetails}>
          <Grid container direction='column' spacing={3}>
            {mainTabsList}
            <SubmitButton />
          </Grid>
        </AccordionDetails>
      </Accordion>
    </form>
  )
}

export default NavigationForm
