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
import MainTabFormSection from './MainTabFormSection'



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
      secondaryTabList = mainTab.secondary_tabs.map((secondaryTab) => (
        <h1>{secondaryTab.label}</h1>
      ))
    }

    return (
      <Grid item container direction='column'>
        <MainTabFormSection index={index} label={mainTab.label} visible={mainTab.visible}/>
        <Grid item>{secondaryTabList && secondaryTabList}</Grid>
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
