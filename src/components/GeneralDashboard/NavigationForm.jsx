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
import SubmitButton from './SubmitButton'
import { withStyles } from '@material-ui/core/styles'

const StyledSwitch = withStyles({
  switchBase: {
    color: '#ddd',
    '&$checked': {
      color: '#0BDA51',
    },
    '&$checked + $track': {
      backgroundColor: '#00FF00',
    },
  },
  checked: {},
  track: {},
})(Switch)

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

  const mainTabsList = mainTabs.map((mainTab, index)=>(
    <Grid item container direction='row' alignItems='center'>
      <Typography variant='h7' style={{marginRight: '1rem'}}>{index}.</Typography>
      <Controller
        name={`main-tab-${index}-input`}
        control={control}
        defaultValue={mainTab.label}
        rules={{ required: 'This field cannot be empty' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            data-cy={`main-tab-${index}-input`}
            variant='outlined'
            label={`Label*`}
            inputProps={{ maxLength: labelMaxLength }}
            error={!!error}
            helperText={error ? error.message : null}
            value={value}
            onChange={onChange}
          />
        )}
      />
      <Controller
        name={`main-tab-${1}-switch`}
        control={control}
        defaultValue={mainTab.visible}
        render={({ field: { onChange, value } }) => (
          <FormControlLabel
            control={<StyledSwitch checked={value} onChange={onChange} articleId={1} />}
            label={
              <Typography className={commonClasses.switchLabel}>
                {value ? 'Visible' : 'Hidden'}
              </Typography>
            }
            labelPlacement='bottom'
          />
        )}
      />
    </Grid>
  ))

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
