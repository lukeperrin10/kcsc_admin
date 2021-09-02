import React from 'react'

import { useForm } from 'react-hook-form'
import { Grid } from '@material-ui/core'
import useNavigationDashboard from '../theme/navigationTheme'
import SubmitButton from '../components/SubmitButton'
import TabFormSection from '../components/GeneralDashboard/TabFormSection'
import AppData from '../modules/AppData'

const NavigationForm = ({ tabs }) => {
  const { control, handleSubmit } = useForm()
  const classes = useNavigationDashboard()

  const onSubmit = ({ navigation }) => {
    const attributes = AppData.toNavigationObject(navigation)
    AppData.update(attributes)
  }

  const mainTabsList = tabs.main_tabs.map((mainTab, index) => {
    let secondaryTabList = <></>
    if (mainTab.secondary_tabs) {
      secondaryTabList = tabs.secondary_tabs.map((secondaryTab, indexSec) => (
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
      ))
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
    <Grid className={classes.container}>
      <form data-cy='navigation-form' onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction='column' spacing={3}>
          {mainTabsList}
          <SubmitButton dataCy='navigation-submit-button' />
        </Grid>
      </form>
    </Grid>
  )
}

export default NavigationForm
